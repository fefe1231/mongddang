package com.onetwo.mongddang.domain.missionlog.controller;

import com.onetwo.mongddang.common.annotation.ChildRequired;
import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.domain.missionlog.application.MissionLogUtils;
import com.onetwo.mongddang.domain.missionlog.service.MissionLogService;
import com.onetwo.mongddang.domain.user.jwt.JwtExtratService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mission")
@Tag(name = "Mission API", description = "미션 API")
public class MissionLogController {

    private final JwtExtratService jwtExtratService;
    private final MissionLogService missionLogService;
    private final MissionLogUtils missionLogUtils;

    // 미션 목록 조회 api
    @GetMapping("")
    @ChildRequired
    @Tag(name = "Mission API", description = "미션 api")
    @Operation(summary = "미션 목록 조회 api", description = "미션 목록을 조회합니다.")
    public ResponseEntity<ResponseDto> getMissionList(HttpServletRequest request) {
        log.info("GET /api/mission");

        Long childId = jwtExtratService.jwtFindId(request);
        ResponseDto responseDto = missionLogService.getTodayMissionLogList(childId);
        return ResponseEntity.ok(responseDto);
    }

    // 미션 생성 api
//    @PostMapping("")
//    @ChildRequired
//    @Tag(name = "Mission API", description = "미션 api")
//    @Operation(summary = "미션 생성 api", description = "미션을 생성합니다.")
//    public void createMissionList(HttpServletRequest request) {
//        log.info("POST /api/mission");
//
//        Long childId = jwtExtratService.jwtFindId(request);
//        missionLogUtils.createMission(childId);
//
//        log.info("미션 생성 완료");
//    }

}
