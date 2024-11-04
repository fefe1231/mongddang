package com.onetwo.mongddang.domain.record.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.common.utils.DateTimeUtils;
import com.onetwo.mongddang.domain.medication.dto.MedicationDto;
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
import com.onetwo.mongddang.domain.user.service.MyChildrenInfoService;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

import static com.onetwo.mongddang.domain.record.model.Record.RecordCategoryType.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;
    private final MyChildrenInfoService myChildrenInfoService;
    private final CtoPUtils ctoPUtils;
    private final DateTimeUtils dateTimeUtils;

    /**
     * 환아의 활동 기록 조회
     * @param userId 조회를 시도하는 사용자 아이디
     * @param nickname 조회 대상의 닉네임
     * @param startDate 조회 시작 월 (YYYY-MM)
     * @param endDate 조회 종료일 월 (YYYY-MM)
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

        // 아이는 본인의 기록만 조회할 수 있음
        log.info("아이가 다른 유저의 기록 조회 시도");
        if (user.getRole() == User.Role.child && !Objects.equals(user.getNickname(), nickname)) {
            throw new RestApiException(CustomRecordErrorCode.CHILD_ACCESS_DENIED);
        }

        // 보호자의 기록은 조회할 수 없음 (로직상 아이만 존재함)
        log.info("보호자의 기록 조회 시도");
        if (child.getRole() == User.Role.protector) {
            throw new RestApiException(CustomRecordErrorCode.PROTECTOR_ACCESS_DENIED);
        }

        // 연결된 보호자인지 확인 - 보호자는 연결된 아이의 기록만 조회할 수 있음
        log.info("연결된 보호자인지 확인");
        if (!ctoPUtils.checkProtectorAndChildIsConnected(userId, child.getId())) {
            throw new RestApiException(CustomRecordErrorCode.PROTECTOR_ACCESS_DENIED);
        }

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

            // 각 기록의 종류에 따라 분류
            if (record.getCategory().equals(meal) || record.getCategory().equals(exercise) || record.getCategory().equals(sleeping)) {
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
                }
            } else if (record.getCategory().equals(medication)) {
                details.getMedication().add(MedicationDto.builder()
                        .id(record.getId())
                        .name(record.getContent().get("name").asText())
                        .imageUrl(record.getImageUrl())
                        .volume(record.getContent().get("volume").asLong())
                        .route(MedicationDto.RouteType.valueOf(record.getContent().get("route").asText()))
                        .isRepeated(record.getContent().get("isRepeated").asBoolean())
                        .repeatDays(record.getContent().get("repeatDays").asText())
                        .repeatStartTime(LocalDateTime.parse(record.getContent().get("repeatStartTime").asText()))
                        .repeatEndTime(LocalDateTime.parse(record.getContent().get("repeatEndTime").asText()))
                        .isDone(record.getIsDone())
                        .startTime(record.getStartTime())
                        .endTime(record.getEndTime())
                        .build());
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
     * @param childId 운동 시작을 시도하는 아이의 아이디
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
     * @param childId 운동 종료를 시도하는 아이의 아이디
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

}
