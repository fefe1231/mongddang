package com.onetwo.mongddang.domain.game.coinLog.application;

import com.onetwo.mongddang.domain.game.coinLog.model.CoinLog;
import com.onetwo.mongddang.domain.game.coinLog.repository.CoinLogRepository;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class CoinLogUtils {

    private final CoinLogRepository coinLogRepository;
    private final UserRepository userRepository;

    /**
     * 유저의 보유 코인을 조회합니다.
     * @param id 코인을 조회할 유저의 id
     * @return 보유 코인량
     */
    public int getCoinCount(Long id) {
        log.info("getCoinCount id: {}", id);

        // userId에 해당하는 CoinLog 조회
        CoinLog coinLog = coinLogRepository.findTopByChildIdOrderByIdDesc(id).orElseThrow(() -> new RuntimeException("Coin log not found for userId: " + id));

        // 현재 coin 값 반환
        return coinLog.getCoin();
    }

    /**
     * 코인을 지급합니다.
     * @param id 코인을 지급할 유저의 id
     * @param category 코인 지급 카테고리
     * @param amount 지급할 코인량
     * @return 지급된 코인 로그
     * @throws IllegalArgumentException amount 가 0 이하인 경우
     */
    public CoinLog rewardCoin(Long id, CoinLog.CoinCategory category, int amount) {

        // amount 가 0 이하인 경우 예외 처리
        if (amount <= 0) {
            throw new IllegalArgumentException("amount 는 0 이상의 정수여야 합니다.");
        }

        // id 에 해당하는 User 조회
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


    /**
     * 코인을 차감합니다.
     * @param id 유저의 id
     * @param category 코인 차감 카테고리
     * @param amount 차감할 코인량
     * @return 차감된 코인 로그
     * @throws IllegalArgumentException amount 가 0 이하인 경우
     */
    public CoinLog minusCoin(Long id, CoinLog.CoinCategory category, int amount) {
        // id 에 해당하는 User 조회
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("해당 유저를 찾을 수 없습니다. id: " + id));

        // userId에 해당하는 CoinLog 조회
        CoinLog coinLog = coinLogRepository.findTopByChildIdOrderByIdDesc(id).orElseThrow(() -> new RuntimeException("해당 유저에 대한 CoinLog 를 찾을 수 없습니다. id: " + id));

        // 가 부족할 경우 예외 처리
        if (coinLog.getCoin() - amount < 0) {
            throw new IllegalArgumentException("가 부족합니다.");
        }

        // 새로운 CoinLog 기록 추가
        CoinLog newCoinLog = CoinLog.builder()
                .child(user) // 유저
                .coin(coinLog.getCoin() - amount) // 차감량
                .category(CoinLog.CoinCategory.mongddang) // 카테고리
                .build();

        // 새로운 CoinLog 저장
        coinLogRepository.save(newCoinLog);

        return newCoinLog;
    }

    /**
     * 코인 지급 및 차감을 처리합니다.
     * @param id 유저의 id
     * @param coinCategory 코인 카테고리
     * @param amount 코인량
     */
    public void classificationCategoryType(Long id, CoinLog.CoinCategory coinCategory, int amount) {
        if (coinCategory.equals(CoinLog.CoinCategory.mongddang)) {
            minusCoin(id, coinCategory, amount); //  차감
        } else  {
            rewardCoin(id, coinCategory, amount); //  지급
        }
    }
}
