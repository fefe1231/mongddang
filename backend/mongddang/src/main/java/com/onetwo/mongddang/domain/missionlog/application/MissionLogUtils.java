package com.onetwo.mongddang.domain.missionlog.application;


import com.onetwo.mongddang.common.annotation.ChildRequired;
import com.onetwo.mongddang.domain.missionlog.dto.MissionDto;
import com.onetwo.mongddang.domain.missionlog.model.MissionLog;
import com.onetwo.mongddang.domain.missionlog.repository.MissionLogRepository;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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


        User child = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException("해당 아이디의 유저가 존재하지 않습니다."));

        // 오늘의 미션이 존재하는지 확인
        LocalDateTime now = LocalDateTime.now();
        if (missionLogRepository.existsByChildAndCreatedAtBetween(child, now.withHour(0).withMinute(0).withSecond(0), now.withHour(23).withMinute(59).withSecond(59)
        )) {
            log.info("이미 오늘의 미션을 생성했습니다. (In English : Already created today's mission.)");
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
                    .createdAt(now)
                    .build();
            todayMissionList.add(todayMission);
        }

        // 오늘의 미션 저장
        missionLogRepository.saveAll(todayMissionList);
        log.info("오늘의 미션을 생성했습니다.");
    }

}
