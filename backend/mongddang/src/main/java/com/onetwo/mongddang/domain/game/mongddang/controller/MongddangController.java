package com.onetwo.mongddang.domain.game.mongddang.controller;

import com.onetwo.mongddang.common.ResponseDto;
import com.onetwo.mongddang.domain.game.mongddang.application.MongddangUitils;
import com.onetwo.mongddang.domain.game.mongddang.dto.RequestRecruitMongddangDto;
import com.onetwo.mongddang.domain.game.mongddang.service.MongddangService;
import com.onetwo.mongddang.domain.user.jwt.JwtExtratService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game/collection/mongddang")
public class MongddangController {

    private final MongddangUitils mongddangUitils;
    private final MongddangService mongddangService;
    private final JwtExtratService jwtExtratService;

    /**
     * 몽땅 목록 조회 api
     *
     * @param request
     * @return
     */
    @GetMapping("/{nickname}")
    @Tag(name = "Collection API", description = "도감 api")
    @Operation(summary = "몽땅 목록 조회 api", description = "몽땅 목록을 조회합니다.")
    public ResponseEntity<ResponseDto> getMongddangList(@PathVariable("nickname") String nickname, HttpServletRequest request) {
        log.info("GET /api/game/mongddang");

        Long id = jwtExtratService.jwtFindId(request);
        ResponseDto responseDto = mongddangService.getMongddangList(id);
        return ResponseEntity.ok(responseDto);
    }

    // 몽땅 모집
    @PostMapping("/recruitment")
    @Tag(name = "Collection API", description = "도감 api")
    @Operation(summary = "몽땅 모집 api", description = "코인을 지불하여 몽땅을 모집합니다.")
    public ResponseEntity<ResponseDto> recruitMongddang(@RequestBody RequestRecruitMongddangDto requestDto, HttpServletRequest request) {
        log.info("POST /api/game/mongddang/recruitment");

        Long userId = jwtExtratService.jwtFindId(request);
        ResponseDto responseDto = mongddangService.recruitmentMongddang(userId, requestDto.getMongddangId());
        return ResponseEntity.ok(responseDto);
    }
}
