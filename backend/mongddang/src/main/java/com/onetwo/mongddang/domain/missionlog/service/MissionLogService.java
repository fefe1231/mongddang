package com.onetwo.mongddang.domain.missionlog.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.domain.missionlog.dto.ResponseMissionListDto;
import com.onetwo.mongddang.domain.missionlog.model.MissionLog;
import com.onetwo.mongddang.domain.missionlog.repository.MissionLogRepository;
import com.onetwo.mongddang.domain.user.error.CustomUserErrorCode;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MissionLogService {


    private final MissionLogRepository missionLogRepository;
    private final UserRepository userRepository;


    public ResponseDto getTodayMissionLogList(Long childId) {
        log.info("오늘의 미션 목록 조회 시도 (In English : Attempt to view today's mission list.)");

        User child = userRepository.findById(childId).orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));

        List<MissionLog> todayMissionList = missionLogRepository.findByChildAndCreatedAtBetween(child, LocalDateTime.now().withHour(0).withMinute(0).withSecond(0), LocalDateTime.now().withHour(23).withMinute(59).withSecond(59));

        List<ResponseMissionListDto> missionListDto = todayMissionList.stream()
                .map(missionLog -> ResponseMissionListDto.builder()
                        .name(missionLog.getCategory())
                        .reward(missionLog.getReward())
                        .status(missionLog.getStatus())
                        .build())
                .toList();

        return ResponseDto.builder()
                .message("미션 목록 조회에 성공했습니다.")
                .data(missionListDto)
                .build();
    }
}
