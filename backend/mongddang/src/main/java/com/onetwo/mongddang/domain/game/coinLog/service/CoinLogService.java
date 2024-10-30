package com.onetwo.mongddang.domain.game.coinLog.service;

import com.onetwo.mongddang.domain.game.coinLog.model.CoinLog;
import com.onetwo.mongddang.domain.game.coinLog.model.CoinLog.CoinCategory;
import com.onetwo.mongddang.domain.game.coinLog.repository.CoinLogRepository;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Builder
public class CoinLogService {

    private final CoinLogRepository coinLogRepository;
    private final UserRepository userRepository;

    // 보유 코인 조회
    /**
        * 유저의 보유 코인을 조회한다.
        * @param id 코인을 조회할 유저의 id
        * @return 보유 코인량
     */
    public int getCoinCount(Long id) {
        // userId에 해당하는 CoinLog 조회
        CoinLog coinLog = coinLogRepository.findTopByChildIdOrderByIdDesc(id).orElseThrow(() -> new RuntimeException("Coin log not found for userId: " + id));

        // 현재 coin 값 반환
        return coinLog.getCoin();
    }

    // 코인 지급
    /**
        * 코인을 지급하고 지급된 코인 로그를 반환한다.
        * @param id 코인을 지급할 유저의 id
        * @param category 코인 지급 카테고리
        * @param amount 지급할 코인량
        * @return 지급된 코인 로그
        * @throws IllegalArgumentException amount 가 0 이하인 경우
     */
    public CoinLog rewardCoin(Long id, CoinCategory category, int amount) {
        // amount 가 0 이하인 경우 예외 처리
        if (amount <= 0) {
            throw new IllegalArgumentException("amount should be positive");
        }

        // email 에 해당하는 User 조회
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found for id: " + id));

        // 새로운 CoinLog 기록 추가
        int remainCoin = getCoinCount(id); // 보유 코인
        CoinLog newCoinLog = CoinLog.builder()
                .child(user) // 유저
                .coin(remainCoin + amount) // 지급량
                .category(category) // 카테고리
                .build();

        // 새로운 CoinLog 저장
        coinLogRepository.save(newCoinLog);

        return newCoinLog;
    }

}
