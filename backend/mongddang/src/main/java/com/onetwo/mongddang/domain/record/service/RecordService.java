package com.onetwo.mongddang.domain.record.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.common.s3.S3ImageService;
import com.onetwo.mongddang.common.s3.errors.CustomS3ErrorCode;
import com.onetwo.mongddang.common.utils.DateTimeUtils;
import com.onetwo.mongddang.common.utils.JsonUtils;
import com.onetwo.mongddang.domain.record.dto.RecordDetailsDto;
import com.onetwo.mongddang.domain.record.dto.RecordWithChildIdDto;
import com.onetwo.mongddang.domain.record.dto.ResponseRecordDto;
import com.onetwo.mongddang.domain.record.errors.CustomRecordErrorCode;
import com.onetwo.mongddang.domain.record.model.Record;
import com.onetwo.mongddang.domain.record.repository.RecordRepository;
import com.onetwo.mongddang.domain.user.application.CtoPUtils;
import com.onetwo.mongddang.domain.user.error.CustomUserErrorCode;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

import static com.onetwo.mongddang.domain.record.model.Record.RecordCategoryType.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;
    private final CtoPUtils ctoPUtils;
    private final DateTimeUtils dateTimeUtils;
    private final S3ImageService s3ImageService;
    private final JsonUtils jsonUtils;

    /**
     * 환아의 활동 기록 조회
     *
     * @param userId    조회를 시도하는 사용자 아이디
     * @param nickname  조회 대상의 닉네임
     * @param startDate 조회 시작 월 (YYYY-MM)
     * @param endDate   조회 종료일 월 (YYYY-MM)
     * @return ResponseDto
     */
    public ResponseDto getRecord(Long userId, String nickname, String startDate, String endDate) {
        log.info("getRecord userId: {}", userId);

        // 요청자의 정보
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("user: {}", user.getEmail());

        // 환아의 정보
        User child = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("child: {}", child.getEmail());

        // 보호자가 어린이의 데이터에 쓰기 권한이 있는지 확인
        ctoPUtils.validateProtectorAccessChildData(user, child);

        // 시작일과 종료일을 LocalDateTime 으로 변환
        LocalDateTime[] dateTimes = dateTimeUtils.convertToDateTimes(startDate, endDate);
        LocalDateTime startDateTime = dateTimes[0];
        LocalDateTime endDateTime = dateTimes[1];
        log.info("startDateTime: {}, endDateTime: {}", startDateTime, endDateTime);

        // 활동 기록을 조회할 때, 시작일과 종료일을 받아 해당 기간의 활동 기록을 조회
        List<Record> recordList = recordRepository.findByChildAndStartTimeBetween(child, startDateTime, endDateTime);
        // 날짜별로 기록을 그룹화
        Map<String, RecordDetailsDto> recordsByDate = new HashMap<>();

        for (Record record : recordList) {
            String recordDate = record.getStartTime().toLocalDate().toString(); // 날짜 추출

            recordsByDate.putIfAbsent(recordDate, new RecordDetailsDto(new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>()));

            RecordDetailsDto details = recordsByDate.get(recordDate);

            RecordWithChildIdDto recordWithChildIdDto = RecordWithChildIdDto.builder()
                    .id(record.getId())
                    .childId(child.getId())
                    .category(record.getCategory())
                    .startTime(record.getStartTime())
                    .endTime(record.getEndTime())
                    .content(record.getContent())
                    .imageUrl(record.getImageUrl())
                    .isDone(record.getIsDone())
                    .mealTime(record.getMealTime())
                    .build();

            // 각 기록의 종류에 따라 분류
            if (record.getCategory().equals(meal)) {
                details.getMeal().add(recordWithChildIdDto);
            } else if (record.getCategory().equals(exercise)) {
                details.getExercise().add(recordWithChildIdDto);
            } else if (record.getCategory().equals(sleeping)) {
                details.getSleep().add(recordWithChildIdDto);
            } else if (record.getCategory().equals(medication)) {
                details.getMedication().add(recordWithChildIdDto);
            }
        }

        // 최종 결과를 DTO로 변환
        List<ResponseRecordDto> dateRecords = recordsByDate.entrySet().stream()
                .map(entry -> new ResponseRecordDto(entry.getKey(), entry.getValue()))
                .toList();

        return ResponseDto.builder()
                .code(200)
                .message("기록 목록 조회에 성공했습니다.")
                .data(Collections.singletonMap("dates", dateRecords))
                .build();
    }

    /**
     * 운동 시작하기
     *
     * @param childId 운동 시작을 시도하는 어린이의 아이디
     * @return ResponseDto
     */
    @Transactional
    public ResponseDto startExercise(Long childId) {
        log.info("startExercise childId: {}", childId);

        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("child: {}", child.getEmail());

        // 가장 최근에 시작된 운동 기록
        Optional<Record> lastedExerciseRecord = recordRepository.findTopByChildAndCategoryAndEndTimeIsNullOrderByIdDesc(child, exercise);

        // 이미 시작된 운동이 있는지 확인
        if (lastedExerciseRecord.isPresent()) {
            throw new RestApiException(CustomRecordErrorCode.EXERCISE_ALREADY_STARTED);
        }

        // 운동 시작 시간 기록
        Record exerciseRecord = Record.builder()
                .child(child)
                .category(exercise)
                .startTime(LocalDateTime.now())
                .endTime(null)
                .content(null)
                .imageUrl(null)
                .isDone(false)
                .mealTime(null)
                .build();

        recordRepository.save(exerciseRecord);
        log.info("운동 시작 기록 완료. 시작시간 : {}", exerciseRecord.getStartTime());

        return ResponseDto.builder()
                .message("운동을 시작합니다.")
                .build();

    }

    /**
     * 운동 종료하기
     *
     * @param childId 운동 종료를 시도하는 어린이의 아이디
     * @return ResponseDto
     */
    @Transactional
    public ResponseDto endExercise(Long childId) {
        log.info("endExercise childId: {}", childId);

        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("child: {}", child.getEmail());

        // 가장 최근에 시작된 운동 기록 조회
        Optional<Record> lastedExerciseRecord = recordRepository.findTopByChildAndCategoryAndEndTimeIsNullOrderByIdDesc(child, exercise);
        log.info("가장 최근에 시작된 운동 기록 조회 성공");

        // 운동 중인지 확인
        log.info("이미 시작된 운동 기록 확인");
        if (lastedExerciseRecord.isEmpty()) {
            throw new RestApiException(CustomRecordErrorCode.EXERCISE_NOT_STARTED);
        }

        // 운동 종료 시간 기록
        Record exerciseRecord = lastedExerciseRecord.get();
        exerciseRecord.setEndTime(LocalDateTime.now());
        exerciseRecord.setIsDone(true);

        recordRepository.save(exerciseRecord);
        log.info("운동 종료 기록 완료. 종료시간 : {}", exerciseRecord.getEndTime());

        return ResponseDto.builder()
                .message("운동을 종료합니다.")
                .build();
    }


    /**
     * 수면 시작하기
     *
     * @param childId 수면 시작을 시도하는 어린이의 아이디
     * @return ResponseDto
     */
    @Transactional
    public ResponseDto startSleep(Long childId) {
        log.info("startSleep childId: {}", childId);

        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("child: {}", child.getEmail());

        log.info("가장 최근에 시작된 수면 기록 조회");
        Optional<Record> lastedSleepRecord = recordRepository.findTopByChildAndCategoryAndEndTimeIsNullOrderByIdDesc(child, sleeping);

        log.info("이미 시작된 수면 기록 확인");
        if (lastedSleepRecord.isPresent()) {
            throw new RestApiException(CustomRecordErrorCode.SLEEP_ALREADY_STARTED);
        }

        // 수면 시작 시간 기록
        Record sleepRecord = Record.builder()
                .child(child)
                .category(sleeping)
                .startTime(LocalDateTime.now())
                .endTime(null)
                .content(null)
                .imageUrl(null)
                .isDone(false)
                .mealTime(null)
                .build();

        recordRepository.save(sleepRecord);
        log.info("수면 시작 기록 완료. 시작시간 : {}", sleepRecord.getStartTime());

        return ResponseDto.builder()
                .message("수면을 시작합니다.")
                .build();
    }

    /**
     * 수면 종료하기
     *
     * @param childId 수면 종료를 시도하는 어린이의 아이디
     * @return ResponseDto
     */
    @Transactional
    public ResponseDto endSleep(Long childId) {
        log.info("endSleep childId: {}", childId);

        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("child: {}", child.getEmail());

        log.info("가장 최근에 시작된 수면 기록 조회");
        Optional<Record> lastedSleepRecord = recordRepository.findTopByChildAndCategoryAndEndTimeIsNullOrderByIdDesc(child, sleeping);

        log.info("이미 시작된 수면 기록 확인");
        if (lastedSleepRecord.isEmpty()) {
            throw new RestApiException(CustomRecordErrorCode.SLEEP_NOT_STARTED);
        }

        // 수면 종료 시간 기록
        Record sleepRecord = lastedSleepRecord.get();
        sleepRecord.setEndTime(LocalDateTime.now());
        sleepRecord.setIsDone(true);

        recordRepository.save(sleepRecord);
        log.info("수면 종료 기록 완료. 종료시간 : {}", sleepRecord.getEndTime());

        return ResponseDto.builder()
                .message("수면을 종료합니다.")
                .build();
    }


    /**
     * 식사 시작하기
     *
     * @param childId     식사 시작을 시도하는 어린이의 아이디
     * @param contentJson 식사 내용
     * @param imageFile   이미지 파일 (파일 경로 또는 URL)
     * @param mealTime    식사 시간 (enum으로 처리)
     * @return ResponseDto
     */
    @Transactional
    public ResponseDto startMeal(Long childId, String contentJson, MultipartFile imageFile, String mealTime) {
        log.info("startMeal childId: {}", childId);

        // SON 문자열을 JsonNode로 변환
        JsonNode content = jsonUtils.JsonStringToJsonNode(contentJson);

        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("child: {}", child.getEmail());

        log.info("가장 최근에 시작된 식사 기록 조회 (in english : Retrieve the most recent meal record)");
        Optional<Record> lastedMealRecord = recordRepository.findTopByChildAndCategoryAndEndTimeIsNullOrderByIdDesc(child, meal);

        log.info("이미 시작된 식사 기록 확인 (in english : Check if the meal record has already started)");
        if (lastedMealRecord.isPresent()) {
            throw new RestApiException(CustomRecordErrorCode.MEAL_ALREADY_STARTED);
        }

        String imageUrl = null;

        if (imageFile != null && !imageFile.isEmpty()) {
            // 이미지 파일을 S3에 업로드
            log.info("식사 이미지 파일을 S3에 업로드 시도 (in english : Try to upload meal image file to S3)");
            try {
                imageUrl = s3ImageService.upload(imageFile); // MultipartFile을 File로 변환 후 S3에 업로드
            } catch (Exception e) {
                throw new RestApiException(CustomS3ErrorCode.IMAGE_UPLOAD_FAILED);
            }
            log.info("식사 이미지 파일을 S3에 업로드 완료 (in english : Meal image file uploaded to S3)");
        }
        log.info("식사 이미지 파일 없음 (in english : No meal image file)");

        log.info(content.toString());

        // 식사 시작 시간 기록
        Record mealRecord = Record.builder()
                .child(child)
                .category(meal)
                .startTime(LocalDateTime.now())
                .endTime(null)
                .content(content)
                .imageUrl(imageUrl)
                .isDone(false)
                .mealTime(Record.MealTimeType.valueOf(mealTime))
                .build();

        recordRepository.save(mealRecord);
        log.info("식사 시작 기록 완료. 시작시간 : {}", mealRecord.getStartTime());

        return ResponseDto.builder()
                .message("식사를 시작합니다.")
                .build();
    }

    /**
     * 식사 종료하기
     *
     * @param childId 식사 종료를 시도하는 어린이의 아이디
     * @return ResponseDto
     */
    @Transactional
    public ResponseDto endMeal(Long childId) {
        log.info("endMeal childId: {}", childId);

        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("child: {}", child.getEmail());

        log.info("가장 최근에 시작된 식사 기록 조회");
        Optional<Record> lastedMealRecord = recordRepository.findTopByChildAndCategoryAndEndTimeIsNullOrderByIdDesc(child, meal);

        log.info("이미 시작된 식사 기록 확인");
        if (lastedMealRecord.isEmpty()) {
            throw new RestApiException(CustomRecordErrorCode.MEAL_NOT_STARTED);
        }

        // 식사 종료 시간 기록
        Record mealRecord = lastedMealRecord.get();
        mealRecord.setEndTime(LocalDateTime.now());
        mealRecord.setIsDone(true);

        recordRepository.save(mealRecord);
        log.info("식사 종료 기록 완료. 종료시간 : {}", mealRecord.getEndTime());

        return ResponseDto.builder()
                .message("식사를 종료합니다.")
                .build();
    }


    // 식사 수정하기
    @Transactional
    public ResponseDto editMeal(Long childId, Long recordId, String contentJson, MultipartFile imageFile, String mealTime) {
        log.info("updateMeal childId: {}, recordId: {}", childId, recordId);

        // SON 문자열을 JsonNode로 변환
        JsonNode content = jsonUtils.JsonStringToJsonNode(contentJson);

        // 어린이 정보 조회
        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("child: {}", child.getEmail());

        // 식사 기록 조회
        Record mealRecord = recordRepository.findById(recordId)
                .orElseThrow(() -> new RestApiException(CustomRecordErrorCode.MEAL_RECORD_NOT_FOUND));
        log.info("mealRecord: {}", mealRecord.getId());

        // 식사 기록이 어린이의 기록인지 확인
        log.info("식사 기록이 어린이의 기록인지 확인 (in english : Check if the meal record is the child's record)");
        if (!Objects.equals(mealRecord.getChild().getId(), childId)) {
            throw new RestApiException(CustomRecordErrorCode.CHILD_ACCESS_DENIED);
        }

        String imageUrl = null;

        log.info("식사 이미지 파일이 있는지 확인 (in english : Check if there is a meal image file)");
        // 이미지 파일이 있다면 s3 등록 진행
        if (imageFile != null && !imageFile.isEmpty()) {
            // 이미지 파일을 S3에 업로드
            log.info("식사 이미지 파일을 S3에 업로드 시도 (in english : Try to upload meal image file to S3)");
            try {
                imageUrl = s3ImageService.upload(imageFile); // MultipartFile 을 File 로 변환 후 S3에 업로드
            } catch (Exception e) {
                throw new RestApiException(CustomS3ErrorCode.IMAGE_UPLOAD_FAILED);
            }
            log.info("식사 이미지 파일을 S3에 업로드 완료 (in english : Meal image file uploaded to S3)");
        }

        log.info("식사 이미지 파일 없음 (in english : No meal image file)");

        // 식사 내용 수정
        mealRecord.setContent(content);
        mealRecord.setImageUrl(imageUrl);
        mealRecord.setMealTime(Record.MealTimeType.valueOf(mealTime));

        recordRepository.save(mealRecord);
        log.info("식사 수정 완료 (in english : Meal modification completed)");

        return ResponseDto.builder()
                .message("식사를 수정합니다.")
                .build();
    }


    /**
     * 복약 기록하기
     *
     * @param childId 복약 기록을 시도하는 어린이의 아이디
     * @return ResponseDto
     */
    public ResponseDto checkMedication(Long childId) {
        log.info("checkMedication childId: {}", childId);

        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("child: {}", child.getEmail());

        Record newMedicationRecord = Record.builder()
                .child(child)
                .category(medication)
                .startTime(LocalDateTime.now())
                .endTime(null)
                .content(null)
                .imageUrl(null)
                .isDone(true)
                .mealTime(null)
                .build();

        recordRepository.save(newMedicationRecord);
        log.info("복약 확인 기록 완료. : {}", newMedicationRecord.getStartTime());

        return ResponseDto.builder()
                .message("복약을 확인합니다.")
                .build();
    }

}
