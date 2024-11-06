package com.onetwo.mongddang.domain.medication.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.common.s3.S3ImageService;
import com.onetwo.mongddang.common.s3.errors.CustomS3ErrorCode;
import com.onetwo.mongddang.common.utils.JsonUtils;
import com.onetwo.mongddang.domain.medication.dto.MedicationStandard;
import com.onetwo.mongddang.domain.medication.dto.RequestRegisterMedicationDto;
import com.onetwo.mongddang.domain.medication.model.MedicationManagement;
import com.onetwo.mongddang.domain.medication.model.MedicationTime;
import com.onetwo.mongddang.domain.medication.repository.MedicationManagementRepository;
import com.onetwo.mongddang.domain.medication.repository.MedicationTimeRepository;
import com.onetwo.mongddang.domain.record.dto.MedicationInfo;
import com.onetwo.mongddang.domain.record.model.Record;
import com.onetwo.mongddang.domain.record.repository.RecordRepository;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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
    private final JsonUtils jsonUtils;

    @Transactional
    public ResponseDto registerMedication(Long childId, String requestRegisterMedicationDtoJson, MultipartFile imageFile) {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        RequestRegisterMedicationDto requestDto;

        try {
            requestDto = objectMapper.readValue(requestRegisterMedicationDtoJson, RequestRegisterMedicationDto.class);
        } catch (Exception e) {
            log.error("JSON 변환 오류: {}", e.getMessage());
            throw new RuntimeException("JSON 변환 오류");
        }

        User child = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException("해당 아이디의 유저가 존재하지 않습니다."));

        String imageUrl = null;

        if (!imageFile.isEmpty()) {
            // 이미지 파일을 S3에 업로드
            log.info("복약 이미지 파일을 S3에 업로드 시도 (in english : Try to upload meal image file to S3)");
            try {
                imageUrl = s3ImageService.upload(imageFile); // MultipartFile을 File로 변환 후 S3에 업로드
            } catch (Exception e) {
                throw new RestApiException(CustomS3ErrorCode.IMAGE_UPLOAD_FAILED);
            }
            log.info("복약 이미지 파일을 S3에 업로드 완료 (in english : Meal image file uploaded to S3)");
        }
        log.info("식사 이미지 파일 없음 (in english : No meal image file)");

        // 약품 등록
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
        medicationManagementRepository.save(medicationManagement);

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
        medicationTimeRepository.saveAll(medicationTimeList);

        // 반복 기록 생성
        List<Record> recordList = new ArrayList<>();
        // 반복 여부 확인
        if (requestDto.getIsRepeated()) {
            // 반복 기록 생성
            List<String> repeatDays = requestDto.getRepeatDays();
            LocalDateTime startDate = requestDto.getRepeatStartTime();
            LocalDateTime endDate = requestDto.getRepeatEndTime();

            // 반복 요일을 숫자로 변환 (월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6, 일: 7)
            List<Integer> repeatDaysIndex = new ArrayList<>();
            String[] daysOfWeek = {"월", "화", "수", "목", "금", "토", "일"};
            for (int i = 0; i < daysOfWeek.length; i++) {
                if (repeatDays.contains(daysOfWeek[i])) {
                    repeatDaysIndex.add(i + 1); // 월요일부터 시작
                }
            }

            // 시작일과 종료일 사이에 반복 기록 생성
            for (LocalDateTime date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                // 반복 요일에 해당하는 경우 기록 생성
                if (repeatDaysIndex.contains(date.getDayOfWeek().getValue())) {
                    for (String repeatTime : requestDto.getRepeatTimes()) {

                        // 반복 시간에 해당하는 의약 기록 생성
                        MedicationInfo medicationContent = MedicationInfo.builder()
                                .name(requestDto.getName())
                                .imageUrl(imageUrl)
                                .route(requestDto.getRoute())
                                .isRepeated(requestDto.getIsRepeated())
                                .repeatDays(requestDto.getRepeatDays())
                                .repeatDays(requestDto.getRepeatDays())
                                .repeatStartTime(requestDto.getRepeatStartTime())
                                .repeatEndTime(requestDto.getRepeatEndTime())
                                .isFast(requestDto.getIsFast())
                                .repeatTimes(requestDto.getRepeatTimes())
                                .standards(requestDto.getStandards())
                                .build();

                        // MedicationInfo 객체를 JsonNode로 변환
                        JsonNode jsonMedicationContent = objectMapper.valueToTree(medicationContent);

                        // 문자열을 LocalTime으로 변환
                        LocalTime localTime = LocalTime.parse(repeatTime, DateTimeFormatter.ofPattern("HH:mm"));

                        // LocalDate와 LocalTime을 결합하여 LocalDateTime 생성
                        LocalDateTime newDateTime = LocalDateTime.of(LocalDate.from(date), localTime);

                        // 날짜와 시간을 합쳐서 LocalDateTime 으로 변환
                        Record medicationRecord = Record.builder()
                                .child(child)
                                .content(jsonMedicationContent)
                                .imageUrl(null)
                                .isDone(false)
                                .category(Record.RecordCategoryType.medication)
                                .startTime(newDateTime)
                                .endTime(null)
                                .build();

                        recordList.add(medicationRecord);
                    }
                }
            }
        } else {
            throw new IllegalArgumentException("반복 기록이 아닌 경우는 지원하지 않습니다.");
//            // 비반복 기록 처리
//            MedicationInfo medicationContent = MedicationInfo.builder()
//                    .name(requestDto.getName())
//                    .volume(requestDto.getSingleVolume()) // 비반복량
//                    .repeatDays(null) // 비반복이므로 null
//                    .repeatStartTime(null) // 비반복이므로 null
//                    .repeatEndTime(null) // 비반복이므로 null
//                    .isRepeated(false)
//                    .minGlucose(requestDto.isFast() ? requestDto.getMinGlucose() : null)
//                    .maxGlucose(requestDto.isFast() ? requestDto.getMaxGlucose() : null)
//                    .build();
//
//            ObjectMapper objectMapper = new ObjectMapper();
//            JsonNode jsonMedicationContent = objectMapper.valueToTree(medicationContent);
//
//            Record medicationRecord = Record.builder()
//                    .child(child)
//                    .content(jsonMedicationContent)
//                    .imageUrl(null)
//                    .isDone(false)
//                    .category(Record.RecordCategoryType.medication)
//                    .startTime(LocalDateTime.now()) // 적절한 시작 시간 설정
//                    .endTime(null) // 필요에 따라 설정
//                    .build();
//
//            recordList.add(medicationRecord);
        }

        // recordList 에 있는 모든 기록을 DB에 저장
        recordRepository.saveAll(recordList);

        return ResponseDto.builder()
                .message("약품 등록을 성공하였습니다.")
                .build();
    }

    // 약품 조회
    public ResponseDto getMedication(Long userId, String nickname) {
        return null;
    }
}
