package com.onetwo.mongddang.domain.game.mongddang.controller;

import com.onetwo.mongddang.common.ResponseDto;
import com.onetwo.mongddang.domain.game.mongddang.application.MongddangUitils;
import com.onetwo.mongddang.domain.game.mongddang.service.MongddangService;
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
@RequestMapping("/api/game/collection/mongddang")
public class MongddangController {

    private final MongddangUitils mongddangUitils;
    private final MongddangService mongddangService;
    private final JwtExtratService jwtExtratService;

    // 몽땅 목록 조회
    @GetMapping("/veiw")
    @Tag(name = "Collection API", description = "도감 api")
    @Operation(summary = "몽땅 목록 조회 api", description = "목땅 목록을 조회합니다.")
    public ResponseEntity<ResponseDto> getMongddangList(HttpServletRequest request) {
        log.info("GET /api/game/mongddang");

        Long id = jwtExtratService.jwtFindId(request);
        ResponseDto responseDto = mongddangService.getMongddangList(id);
        return ResponseEntity.ok(responseDto);
    }

}
