package com.onetwo.mongddang.domain.medication.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.common.s3.S3ImageService;
import com.onetwo.mongddang.common.s3.errors.CustomS3ErrorCode;
import com.onetwo.mongddang.domain.medication.application.MedicationUtils;
import com.onetwo.mongddang.domain.medication.dto.MedicationStandardDto;
import com.onetwo.mongddang.domain.medication.dto.RegisteredMedicationDto;
import com.onetwo.mongddang.domain.medication.dto.RequestRegisterMedicationDto;
import com.onetwo.mongddang.domain.medication.dto.ResponseMedicationDto;
import com.onetwo.mongddang.domain.medication.model.MedicationManagement;
import com.onetwo.mongddang.domain.medication.model.MedicationTime;
import com.onetwo.mongddang.domain.medication.repository.MedicationManagementRepository;
import com.onetwo.mongddang.domain.medication.repository.MedicationTimeRepository;
import com.onetwo.mongddang.domain.user.application.CtoPUtils;
import com.onetwo.mongddang.domain.user.error.CustomCtoPErrorCode;
import com.onetwo.mongddang.domain.user.error.CustomUserErrorCode;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MedicationService {

    private final UserRepository userRepository;
    private final S3ImageService s3ImageService;
    private final MedicationManagementRepository medicationManagementRepository;
    private final MedicationTimeRepository medicationTimeRepository;
    private final MedicationUtils medicationUtils;
    private final CtoPUtils ctoPUtils;

    @Transactional
    public ResponseDto registerMedication(Long childId, String requestRegisterMedicationDtoJson, MultipartFile imageFile) {


        // JSON 문자열을 RequestRegisterMedicationDto 객체로 변환
        RequestRegisterMedicationDto requestDto = medicationUtils.jsonToMedicationDto(requestRegisterMedicationDtoJson);

        User child = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException("해당 아이디의 유저가 존재하지 않습니다."));

        String imageUrl = null;

        if (!imageFile.isEmpty()) {
            // 이미지 파일을 S3에 업로드
            try {
                imageUrl = s3ImageService.upload(imageFile); // MultipartFile을 File로 변환 후 S3에 업로드
            } catch (Exception e) {
                throw new RestApiException(CustomS3ErrorCode.IMAGE_UPLOAD_FAILED);
            }
        }
        log.info("식사 이미지 파일 없음 (in english : No meal image file)");

        // 복약 관리 기록 DB 에 저장
        MedicationManagement medicationManagement = MedicationManagement.builder()
                .child(child)
                .name(requestDto.getName())
                .route(requestDto.getRoute())
                .isRepeated(requestDto.getIsRepeated())
                .repeatDays(requestDto.getRepeatDays())
                .repeatStartTime(requestDto.getRepeatStartTime())
                .repeatEndTime(requestDto.getRepeatEndTime())
                .imageUrl(imageUrl)
                .build();

        //복약 시간 기록 DB 에 저장
        List<MedicationTime> medicationTimeList = new ArrayList<>();
        for (String repeatTime : requestDto.getRepeatTimes()) {
            for (MedicationStandardDto medicationStandard : requestDto.getStandards()) {
                MedicationTime medicationTime = MedicationTime.builder()
                        .medicationManagement(medicationManagement)
                        .medicationTime(repeatTime)
                        .isFast(requestDto.getIsFast())
                        .minGlucose(requestDto.getIsFast() ? medicationStandard.getMinGlucose() : null)
                        .maxGlucose(requestDto.getIsFast() ? medicationStandard.getMaxGlucose() : null)
                        .volume(medicationStandard.getVolume())
                        .build();

                medicationTimeList.add(medicationTime);
            }
        }

        // DB에 저장
        medicationManagementRepository.save(medicationManagement);
        medicationTimeRepository.saveAll(medicationTimeList);

        return ResponseDto.builder()
                .message("약품 등록을 성공하였습니다.")
                .build();
    }

    // 약품 조회
    public ResponseDto getMedication(Long userId, String nickname) {
        log.info("약품 조회 (In English : Medication Inquiry)");

        User user = userRepository.findById(userId).orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        User child = userRepository.findByNickname(nickname).orElseThrow(() -> new RestApiException(CustomUserErrorCode.THIS_NICKNAME_USER_NOT_FOUND));

        // 보호자와 아이가 연결되어 있는지 확인
        if (!ctoPUtils.checkProtectorAndChildIsConnected(userId, child.getId())) {
            throw new RestApiException(CustomCtoPErrorCode.CHILD_NOT_LINKED);
        }

        // 복약 관리 테이블에서 아이에 해당하는 복약 시간 데이터 조회
        List<MedicationManagement> medicationManagementList = medicationManagementRepository.findByChild(child);
        List<RegisteredMedicationDto> registeredMedicationDtoList = new ArrayList<>();

        // 복약 관리 테이블에서 외래키로 참조한 복약 시간 데이터를 registeredMedicationDtoList 에 데이터 저장
        for (MedicationManagement medicationManagement : medicationManagementList) {
            // 복약 시간 데이터 조회
            List<MedicationTime> medicationTimeList = medicationTimeRepository.findByMedicationManagement(medicationManagement);
            List<MedicationStandardDto> medicationStandardDtoList = new ArrayList<>();

            for (MedicationTime medicationTime : medicationTimeList) {
                MedicationStandardDto medicationStandardDto = MedicationStandardDto.builder()
                        .minGlucose(medicationTime.getMinGlucose())
                        .maxGlucose(medicationTime.getMaxGlucose())
                        .volume(medicationTime.getVolume())
                        .build();

                medicationStandardDtoList.add(medicationStandardDto);
            }

            RegisteredMedicationDto registeredMedicationDto = RegisteredMedicationDto.builder()
                    .id(medicationManagement.getId())
                    .name(medicationManagement.getName())
                    .imageUrl(medicationManagement.getImageUrl())
                    .repeatStartTime(medicationManagement.getRepeatStartTime())
                    .repeatEndTime(medicationManagement.getRepeatEndTime())
                    .isFast(medicationTimeList.get(0).getIsFast())
                    .repeatTimes(medicationTimeList.stream().map(MedicationTime::getMedicationTime).toList())
                    .standards(medicationStandardDtoList)
                    .build();

            registeredMedicationDtoList.add(registeredMedicationDto);
        }

        // ResponseMedicationDto 객체 생성
        ResponseMedicationDto responseMedicationDto = ResponseMedicationDto.builder()
                .medications(registeredMedicationDtoList)
                .build();

        return ResponseDto.builder()
                .message("약품 조회를 성공하였습니다.")
                .data(responseMedicationDto)
                .build();
    }
}
