package com.onetwo.mongddang.domain.record.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.common.utils.DateTimeUtils;
import com.onetwo.mongddang.domain.record.errors.CustomRecordErrorCode;
import com.onetwo.mongddang.domain.record.model.Record;
import com.onetwo.mongddang.domain.record.model.Record.RecordCategoryType;
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
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;
    private final MyChildrenInfoService myChildrenInfoService;
    private final CtoPUtils ctoPUtils;
    private final DateTimeUtils dateTimeUtils;

    // 환아의 활동 기록 조회
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
        if (user.getRole() == User.Role.child && !Objects.equals(user.getNickname(), nickname)) {
            throw new RestApiException(CustomRecordErrorCode.CHILD_ACCESS_DENIED);
        }

        // 보호자의 기록은 조회할 수 없음 (로직상 아이만 존재함)
        if (user.getRole() == User.Role.protector) {
            throw new RestApiException(CustomRecordErrorCode.PROTECTOR_ACCESS_DENIED);
        }

        // 연결된 보호자인지 확인 - 보호자는 연결된 아이의 기록만 조회할 수 있음
        if (ctoPUtils.checkProtectorAndChildIsConnected(userId, child.getId())) {
            throw new RestApiException(CustomRecordErrorCode.PROTECTOR_ACCESS_DENIED);
        }

        // 시작일과 종료일을 LocalDateTime으로 변환
        LocalDateTime[] dateTimes = dateTimeUtils.convertToDateTimes(startDate, endDate);
        LocalDateTime startDateTime = dateTimes[0];
        LocalDateTime endDateTime = dateTimes[1];
        log.info("startDateTime: {}, endDateTime: {}", startDateTime, endDateTime);

        // 활동 기록을 조회할 때, 시작일과 종료일을 받아 해당 기간의 활동 기록을 조회
        List<Record> recordList = recordRepository.findByChildAndStartTimeBetween(child, startDateTime, endDateTime);
        
        return ResponseDto.builder()
                .message("활동 기록을 조회합니다.")
                .data(recordList)
                .build();
    }

    // 운동 시작하기
    @Transactional
    public ResponseDto startExercise(Long childId) {
        log.info("startExercise childId: {}", childId);

        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));
        log.info("child: {}", child.getEmail());

        // 가장 최근에 시작된 운동 기록
        Optional<Record> lastedExerciseRecord = recordRepository.findTopByChildAndCategoryAndEndTimeIsNullOrderByIdDesc(child, RecordCategoryType.exercise);

        // 이미 시작된 운동이 있는지 확인
        if (lastedExerciseRecord.isPresent()) {
            throw new RestApiException(CustomRecordErrorCode.EXERCISE_ALREADY_STARTED);
        }

        // 운동 시작 시간 기록
        Record exerciseRecord = Record.builder()
                .child(child)
                .category(RecordCategoryType.exercise)
                .startTime(LocalDateTime.now())
                .endTime(null)
                .content(null)
                .imageUrl(null)
                .isDone(false)
                .mealTime(null)
                .build();

        recordRepository.save(exerciseRecord);
        log.info("운동 시작 기록 완료. 시작시간 : {}", exerciseRecord.getStartTime());

        // 운동 시작 시간을 기록하고, 운동 중인지 여부를 true로 변경
        // 운동 중인지 여부를 확인하여 이미 운동 중인 경우 에러 메시지 반환
        // 운동 중인지 여부를 확인하여 운동 중이 아닌 경우 운동 시작 시간을 기록하고, 운동 중인지 여부를 true로 변경

        return ResponseDto.builder()
                .message("운동을 시작합니다.")
                .build();

    }


    // 운동 종료하기

}
