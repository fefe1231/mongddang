package com.onetwo.mongddang.domain.game.coinLog.controller;

import com.onetwo.mongddang.domain.game.coinLog.dto.RequestGetCoinDto;
import com.onetwo.mongddang.domain.game.coinLog.dto.RequestRewardCoinDto;
import com.onetwo.mongddang.domain.game.coinLog.dto.ResponseCoin;
import com.onetwo.mongddang.domain.game.coinLog.model.CoinLog;
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
     * @param requestGetCoinDto
     * @return ResponseCoin
     */
    @GetMapping("/coin")
    public ResponseEntity<ResponseCoin> getRemainCoin(@RequestBody RequestGetCoinDto requestGetCoinDto, HttpServletRequest request) {
        log.info("GET /api/game/coin/");

        // 유저의 id를 jwt 에서 추출
        Long userId = jwtExtratService.jwtFindId(request);

        // 빌더 패턴을 사용하여 ResponseCoin 객체 생성
        ResponseCoin response = ResponseCoin.builder()
                .coin(coinLogService.getCoinCount(userId))
                .build();

        return ResponseEntity.ok(response);
    }

    /**
     * 코인을 지급하고 지급된 코인량을 반환
     * @param requestRewardCoinDto
     * @return ResponseCoin
     */
    @PostMapping("/coin/reward")
    public ResponseEntity<ResponseCoin> rewardCoin(@RequestBody RequestRewardCoinDto requestRewardCoinDto, HttpServletRequest request) {
        log.info("POST /api/game/coin/reward");

        // 유저의 id를 jwt 에서 추출
        Long userId = jwtExtratService.jwtFindId(request);

        // 코인 지급
        CoinLog newCoinLog = coinLogService.rewardCoin(userId, requestRewardCoinDto.getCategory(), requestRewardCoinDto.getCoin());

        // 빌더 패턴을 사용하여 ResponseCoin 객체 생성
        ResponseCoin response = ResponseCoin.builder()
                .coin(newCoinLog.getCoin())
                .build();

        return ResponseEntity.ok(response);
    }

}
