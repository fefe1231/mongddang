package com.onetwo.mongddang.domain.medication.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.common.s3.S3ImageService;
import com.onetwo.mongddang.common.s3.errors.CustomS3ErrorCode;
import com.onetwo.mongddang.domain.medication.application.MedicationUtils;
import com.onetwo.mongddang.domain.medication.dto.MedicationStandard;
import com.onetwo.mongddang.domain.medication.dto.RequestRegisterMedicationDto;
import com.onetwo.mongddang.domain.medication.model.MedicationManagement;
import com.onetwo.mongddang.domain.medication.model.MedicationTime;
import com.onetwo.mongddang.domain.medication.repository.MedicationManagementRepository;
import com.onetwo.mongddang.domain.medication.repository.MedicationTimeRepository;
import com.onetwo.mongddang.domain.record.repository.RecordRepository;
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

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;
    private final S3ImageService s3ImageService;
    private final MedicationManagementRepository medicationManagementRepository;
    private final MedicationTimeRepository medicationTimeRepository;
    private final MedicationUtils medicationUtils;

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

        // 기록에 저장할 데이터 리스트 생성
//        List<Record> recordList = new ArrayList<>();

        // 반복 여부 확인
//        if (requestDto.getIsRepeated()) {
        // 반복 기록 처리

        // 반복 기록 생성
//            List<String> repeatDays = requestDto.getRepeatDays();
//            LocalDateTime startDate = requestDto.getRepeatStartTime();
//            LocalDateTime endDate = requestDto.getRepeatEndTime();

        // 반복 요일을 숫자로 변환 (월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6, 일: 7)
//            List<Integer> repeatDaysIndex = new ArrayList<>();
//            String[] daysOfWeek = {"월", "화", "수", "목", "금", "토", "일"};
//            for (int i = 0; i < daysOfWeek.length; i++) {
//                if (repeatDays.contains(daysOfWeek[i])) {
//                    repeatDaysIndex.add(i + 1); // 월요일부터 시작
//                }
//            }

        // 시작일과 종료일 사이에 반복 기록 생성
//            for (LocalDateTime date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
//                // 반복 요일에 해당하는 경우 기록 생성
//                if (repeatDaysIndex.contains(date.getDayOfWeek().getValue())) {
//                    for (String repeatTime : requestDto.getRepeatTimes()) {
//
//                        // 반복 시간에 해당하는 의약 기록 생성
//                        MedicationInfo medicationContent = MedicationInfo.builder()
//                                .name(requestDto.getName())
//                                .imageUrl(imageUrl)
//                                .route(requestDto.getRoute())
//                                .isRepeated(requestDto.getIsRepeated())
//                                .repeatDays(requestDto.getRepeatDays())
//                                .repeatDays(requestDto.getRepeatDays())
//                                .repeatStartTime(requestDto.getRepeatStartTime())
//                                .repeatEndTime(requestDto.getRepeatEndTime())
//                                .isFast(requestDto.getIsFast())
//                                .repeatTimes(requestDto.getRepeatTimes())
//                                .standards(requestDto.getStandards())
//                                .build();
//
//                        // MedicationInfo 객체를 JsonNode로 변환
//                        ObjectMapper objectMapper = new ObjectMapper();
//                        JsonNode jsonMedicationContent = objectMapper.valueToTree(medicationContent);
//
//                        // 문자열을 LocalTime으로 변환
//                        LocalTime localTime = LocalTime.parse(repeatTime, DateTimeFormatter.ofPattern("HH:mm"));
//
//                        // LocalDate와 LocalTime을 결합하여 LocalDateTime 생성
//                        LocalDateTime newDateTime = LocalDateTime.of(LocalDate.from(date), localTime);
//
//                        // 날짜와 시간을 합쳐서 LocalDateTime 으로 변환
//                        Record medicationRecord = Record.builder()
//                                .child(child)
//                                .content(jsonMedicationContent)
//                                .imageUrl(null)
//                                .isDone(false)
//                                .category(Record.RecordCategoryType.medication)
//                                .startTime(newDateTime)
//                                .endTime(null)
//                                .build();
//
//                        recordList.add(medicationRecord);
//                    }
//                }
//            }

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
            for (MedicationStandard medicationStandard : requestDto.getStandards()) {
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

        medicationManagementRepository.save(medicationManagement);
        medicationTimeRepository.saveAll(medicationTimeList);


//        } else {
//            // 비반복 기록 처리
//            if (requestDto.getIsRepeated() == false) {
//
//            }
//
//            // 반복 시간에 해당하는 의약 기록 생성
//            MedicationInfo medicationContent = MedicationInfo.builder()
//                    .name(requestDto.getName())
//                    .imageUrl(imageUrl)
//                    .route(requestDto.getRoute())
//                    .isRepeated(requestDto.getIsRepeated())
//                    .repeatDays(requestDto.getRepeatDays())
//                    .repeatDays(requestDto.getRepeatDays())
//                    .repeatStartTime(requestDto.getRepeatStartTime())
//                    .repeatEndTime(requestDto.getRepeatEndTime())
//                    .isFast(requestDto.getIsFast())
//                    .repeatTimes(requestDto.getRepeatTimes())
//                    .standards(requestDto.getStandards())
//                    .build();
//
//            Record medicationRecord = Record.builder()
//                    .child(child)
//                    .content(null)
//                    .imageUrl(imageUrl)
//                    .isDone(false)
//                    .category(Record.RecordCategoryType.medication)
//                    .startTime(requestDto.getRepeatStartTime())
//                    .endTime(null)
//                    .build();
//
//            recordList.add(medicationRecord);
//        }

        // recordList 에 있는 모든 기록을 DB에 저장
//        recordRepository.saveAll(recordList);

        return ResponseDto.builder()
                .message("약품 등록을 성공하였습니다.")
                .build();
    }

    // 약품 조회
    public ResponseDto getMedication(Long userId, String nickname) {
        return null;
    }
}
