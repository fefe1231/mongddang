package com.onetwo.mongddang.domain.game.coinLog.controller;

import com.onetwo.mongddang.domain.common.annotation.ChildRequired;
import com.onetwo.mongddang.domain.game.coinLog.dto.ResponseCoin;
import com.onetwo.mongddang.domain.game.coinLog.service.CoinLogService;
import com.onetwo.mongddang.domain.user.jwt.JwtExtratService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game")
public class CoinLogController {

    private final CoinLogService coinLogService;
    private final JwtExtratService jwtExtratService;

    /**
     * 보유 코인을 반환
     *
     * @return ResponseCoin
     */
    @GetMapping("/coin")
    @ChildRequired
    public ResponseEntity<ResponseCoin> getRemainCoin(HttpServletRequest request) {
        log.info("GET /api/game/coin");

        // 유저의 id를 jwt 에서 추출
        Long userId = jwtExtratService.jwtFindId(request);

        // 빌더 패턴을 사용하여 ResponseCoin 객체 생성
        ResponseCoin response = coinLogService.responseGetCoinCount(userId);

        return ResponseEntity.ok(response);
    }

}
