package com.onetwo.mongddang.domain.game.mongddang.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.domain.game.coinLog.application.CoinLogUtils;
import com.onetwo.mongddang.domain.game.coinLog.model.CoinLog;
import com.onetwo.mongddang.domain.game.coinLog.model.CoinLog.CoinCategory;
import com.onetwo.mongddang.domain.game.coinLog.repository.CoinLogRepository;
import com.onetwo.mongddang.domain.game.mongddang.dto.RequestMongddangListDto;
import com.onetwo.mongddang.domain.game.mongddang.errors.CustomMongddangErrorCode;
import com.onetwo.mongddang.domain.game.mongddang.model.Mongddang;
import com.onetwo.mongddang.domain.game.mongddang.model.MyMongddang;
import com.onetwo.mongddang.domain.game.mongddang.repository.MongddangRepository;
import com.onetwo.mongddang.domain.game.mongddang.repository.MyMongddangRepository;
import com.onetwo.mongddang.domain.user.error.CustomUserErrorCode;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
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
     * 몽땅 목록 조회
     *
     * @param childId
     * @return
     */
    public ResponseDto getMongddangList(Long childId) {
        log.info("getMongddangList childId: {}", childId);

        List<Mongddang> mongddangList = mongddangRepository.findAll();
        List<RequestMongddangListDto> mongddangListDto = mongddangList.stream()
                .map(mongddang -> {
                    MyMongddang myMongddang = myMongddangRepository.findByMongddangId(childId)
                            .orElseThrow(() -> new RestApiException(CustomMongddangErrorCode.INVALID_COLLECTION_ID));

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
     * 몽땅 모집
     *
     * @param userId
     * @param mongddangId
     * @return
     */
    @Transactional
    public ResponseDto recruitmentMongddang(Long userId, Long mongddangId) {
        log.info("recruitmentMongddang userId: {}, mongddangId: {}", userId, mongddangId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));

        // 몽땅이 존재하지 않는 경우
        Mongddang mongddang = mongddangRepository.findById(mongddangId)
                .orElseThrow(() -> new RestApiException(CustomMongddangErrorCode.INVALID_COLLECTION_ID));

        // 이미 소유한 몽땅인 경우
        myMongddangRepository.findByMongddangId(mongddangId)
                .orElseThrow(() -> new RestApiException(CustomMongddangErrorCode.CHARACTER_ALREADY_OWNED));

        // 코인 차감
        int remainCoin = coinLogUtils.getCoinCount(userId);
        coinLogUtils.deductCoin(userId, CoinCategory.mongddang, mongddang.getPrice());

        // 마이 몽땅 생성
        MyMongddang newMyMongddang = MyMongddang.builder()
                .child(user)
                .mongddang(mongddang)
                .isNew(true)
                .isMain(false)
                .createdAt(LocalDateTime.now())
                .build();

        // 코인 로그 생성
        CoinLog newCoinLog = CoinLog.builder()
                .child(user)
                .coin(remainCoin - mongddang.getPrice())
                .category(CoinCategory.mongddang)
                .build();

        myMongddangRepository.save(newMyMongddang);
        coinLogRepository.save(newCoinLog);

        return ResponseDto.builder().message("몽땅 모집에 성공했습니다.").build();
    }


    /**
     * 새로운 몽땅 표시 제거
     *
     * @param mongddangId
     * @return
     */
    public ResponseDto checkNewMongddang(Long mongddangId) {
        log.info("checkNewMongddang mongddangId: {}", mongddangId);

        MyMongddang myMongddang = myMongddangRepository.findByMongddangId(mongddangId)
                .orElseThrow(() -> new RestApiException(CustomMongddangErrorCode.INVALID_COLLECTION_ID));

        // 해당 몽땅의 새로 획득한 표시를 를 이미 제거한 경우
        if (!myMongddang.getIsNew()) {
            throw new RestApiException(CustomMongddangErrorCode.LABEL_ALREADY_REMOVED);
        }

        myMongddang.setIsNew(false);
        myMongddangRepository.save(myMongddang);

        return ResponseDto.builder().message("새로운 몽땅 표시를 제거했습니다.").build();
    }

    /**
     * 몽땅 메인 설정
     *
     * @param mongddangId
     * @return
     */
    @Transactional
    public ResponseDto setMainMongddang(Long mongddangId, Long userId) {
        log.info("setMainMongddang mongddangId: {}", mongddangId);

        // 기존 몽땅이 존재하지 않는 경우 - 회원가입 시 초기화를 통해 일어나지 않을 에러
        MyMongddang beforeMainMongddang = myMongddangRepository.findByChildIdAndIsMainTrue(userId)
                .orElseThrow(
                        () -> new RestApiException(CustomMongddangErrorCode.INVALID_COLLECTION_ID)
                );

        // 해당 몽땅이 존재하지 않는 경우
        MyMongddang myMongddang = myMongddangRepository.findByMongddangId(mongddangId)
                .orElseThrow(
                        () -> new RestApiException(CustomMongddangErrorCode.INVALID_COLLECTION_ID)
                );

        // 해당 몽땅이 이미 메인으로 설정된 경우
        if (myMongddang.getIsMain()) {
            throw new RestApiException(CustomMongddangErrorCode.ALREADY_RECRUITED);
        }

        // 새로운 메인 몽땅을 true 로 변경
        myMongddang.setIsMain(true);
        myMongddangRepository.save(myMongddang);

        // 기존 메인 몽땅의 isMain 을 false 로 변경
        beforeMainMongddang.setIsMain(false);
        myMongddangRepository.save(beforeMainMongddang);

        return ResponseDto.builder().message("메인 몽땅으로 설정했습니다.").build();
    }

}
