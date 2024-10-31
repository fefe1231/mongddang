package com.onetwo.mongddang.domain.game.mongddang.service;

import com.onetwo.mongddang.common.ResponseDto;
import com.onetwo.mongddang.domain.game.coinLog.application.CoinLogUtils;
import com.onetwo.mongddang.domain.game.coinLog.model.CoinLog;
import com.onetwo.mongddang.domain.game.coinLog.model.CoinLog.CoinCategory;
import com.onetwo.mongddang.domain.game.coinLog.repository.CoinLogRepository;
import com.onetwo.mongddang.domain.game.mongddang.dto.RequestMongddangListDto;
import com.onetwo.mongddang.domain.game.mongddang.model.Mongddang;
import com.onetwo.mongddang.domain.game.mongddang.model.MyMongddang;
import com.onetwo.mongddang.domain.game.mongddang.repository.MongddangRepository;
import com.onetwo.mongddang.domain.game.mongddang.repository.MyMongddangRepository;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class MongddangService {

    private final MongddangRepository mongddangRepository;
    private final MyMongddangRepository myMongddangRepository;
    private final UserRepository userRepository;
    private final CoinLogUtils coinLogUtils;
    private final CoinLogRepository coinLogRepository;


    /**
     * 몽땅 목록 조회 api
     *
     * @param childId
     * @return
     */
    public ResponseDto getMongddangList(Long childId) {
        log.info("GET /api/game/mongddang");

        List<Mongddang> mongddangList = mongddangRepository.findAll();
        List<RequestMongddangListDto> mongddangListDto = mongddangList.stream()
                .map(mongddang -> {
                    MyMongddang myMongddang = myMongddangRepository.findByMongddangId(childId);

                    // 몽땅 소유 여부
                    boolean isOwned = myMongddang != null;

                    return RequestMongddangListDto.builder()
                            .id(mongddang.getId())
                            .name(mongddang.getName())
                            .story(mongddang.getStory())
                            .price(mongddang.getPrice())
                            .isOwned(isOwned)
                            .isNew(isOwned ? myMongddang.getIsNew() : false)
                            .isMain(isOwned ? myMongddang.getIsMain() : false)
                            .build();
                })
                .toList();

        ResponseDto response = ResponseDto.builder()
                .message("몽땅 목록 조회에 성공했습니다.")
                .data(mongddangListDto)
                .build();

        return response;
    }


    /**
     * 몽땅 모집 api
     *
     * @param userId
     * @param mongddangId
     * @return
     */
    @Transactional
    public ResponseDto recruitmentMongddang(Long userId, Long mongddangId) {
        log.info("POST /api/game/mongddang/recruitment");

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));
        Mongddang mongddang = mongddangRepository.findById(mongddangId).orElseThrow(() -> new IllegalArgumentException("해당 몽땅이 존재하지 않습니다."));

        MyMongddang myMongddang = myMongddangRepository.findByMongddangId(mongddangId);
        if (myMongddang != null) {
            throw new IllegalArgumentException("이미 소유한 몽땅입니다.");
        }

        // 코인 차감
        int remainCoin = coinLogUtils.getCoinCount(userId);
        if (remainCoin < mongddang.getPrice()) {
            throw new IllegalArgumentException("코인이 부족합니다.");
        }
        coinLogUtils.minusCoin(userId, CoinCategory.mongddang, mongddang.getPrice());

        // 몽땅 획득
        MyMongddang newMyMongddang = MyMongddang.builder()
                .child(user)
                .mongddang(mongddang)
                .isNew(true)
                .isMain(false)
                .createdAt(LocalDateTime.now())
                .build();

        // 코인 로그 추가
        CoinLog newCoinLog = CoinLog.builder()
                .child(user)
                .coin(remainCoin - mongddang.getPrice())
                .category(CoinCategory.mongddang)
                .build();

        // 저장
        myMongddangRepository.save(newMyMongddang);
        coinLogRepository.save(newCoinLog);

        return ResponseDto.builder()
                .message("몽땅 모집에 성공했습니다.")
                .build();
    }


    // 새로 획득한 표시 제거
    public ResponseDto checkNewMongddang() {

        return null;
    }

    // 메인 몽땅 설정
    public ResponseDto setMainMongddang() {

        return null;
    }
}
