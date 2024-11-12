package com.onetwo.mongddang.domain.fcm.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.domain.fcm.model.PushLog;
import com.onetwo.mongddang.domain.fcm.repository.PushLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReadPushLogService {

    private final PushLogRepository pushLogRepository;

    public ResponseDto readPushLog(Long userId, Long notificationId) {

        PushLog pushLog = pushLogRepository.findById(notificationId)
                .orElseThrow(()-> new IllegalArgumentException("ID cannot be null")); // 에러 코드 추가해야 함

        PushLog newPushLog = pushLog.toBuilder()
                .is_new(false)
                .build();
        pushLogRepository.save(newPushLog);

        //response
        ResponseDto response = ResponseDto.builder()
                .message("알림기록 조회에 성공했습니다.")
                .build();

        return response;
    }
}
