package com.onetwo.mongddang.domain.record.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.domain.record.errors.CustomRecordErrorCode;
import com.onetwo.mongddang.domain.record.model.Record;
import com.onetwo.mongddang.domain.record.model.Record.RecordCategoryType;
import com.onetwo.mongddang.domain.record.repository.RecordRepository;
import com.onetwo.mongddang.domain.user.error.CustomUserErrorCode;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;

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
