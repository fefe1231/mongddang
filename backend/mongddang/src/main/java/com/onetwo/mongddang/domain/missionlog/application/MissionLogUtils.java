package com.onetwo.mongddang.domain.missionlog.application;


import com.onetwo.mongddang.common.annotation.ChildRequired;
import com.onetwo.mongddang.domain.missionlog.dto.MissionDto;
import com.onetwo.mongddang.domain.missionlog.errors.CustomMissionLogErrors;
import com.onetwo.mongddang.domain.missionlog.model.MissionLog;
import com.onetwo.mongddang.domain.missionlog.repository.MissionLogRepository;
import com.onetwo.mongddang.domain.user.error.CustomUserErrorCode;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MissionLogUtils {

    private final MissionLogRepository missionLogRepository;
    private final UserRepository userRepository;

    // 최초 로그인 시 미션 생성
    @ChildRequired
    public void createMission(Long childId) {
        log.info("오늘의 미션 생성 시도");


        User child = userRepository.findById(childId).orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));

        // 오늘의 미션이 존재하는지 확인
        if (missionLogRepository.existsByChildAndCreatedAtBetween(child, LocalDate.now().atStartOfDay(), LocalDate.now().atTime(23, 59, 59)
        )) {
            log.info("오늘의 미션이 이미 생성되어 있습니다.");
            return;
        }

        // 오늘의 미션 생성
        List<MissionLog> todayMissionList = new ArrayList<>();
        for (MissionDto.Mission mission : MissionDto.Mission.values()) {
            MissionLog todayMission = MissionLog.builder()
                    .child(child)
                    .category(mission)
                    .reward(3L)
                    .status(MissionDto.Status.not_rewardable)
                    .createdAt(LocalDateTime.now())
                    .build();
            todayMissionList.add(todayMission);
        }

        // 오늘의 미션 저장
        missionLogRepository.saveAll(todayMissionList);
        log.info("오늘의 미션을 생성했습니다.");
    }

}
