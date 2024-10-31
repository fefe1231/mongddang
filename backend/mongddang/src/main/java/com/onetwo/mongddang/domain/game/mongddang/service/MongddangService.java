package com.onetwo.mongddang.domain.game.mongddang.service;

import com.onetwo.mongddang.common.ResponseDto;
import com.onetwo.mongddang.domain.game.mongddang.dto.RequestMongddangListDto;
import com.onetwo.mongddang.domain.game.mongddang.model.Mongddang;
import com.onetwo.mongddang.domain.game.mongddang.model.MyMongddang;
import com.onetwo.mongddang.domain.game.mongddang.repository.MongddangRepository;
import com.onetwo.mongddang.domain.game.mongddang.repository.MyMongddangRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class MongddangService {

    private final MongddangRepository mongddangRepository;
    private final MyMongddangRepository myMongddangRepository;

    // 몽땅 추가
    public void addMongddang() {

    }

    // 몽땅 목록 조회
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


    // 몽땅 모집
    public void buyMongddang() {

    }

    // 새로 획득한 표시 제거
    public void checkNewMongddang() {

    }

    // 메인 몽땅 설정
    public void setMainMongddang() {

    }
}
