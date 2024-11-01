package com.onetwo.mongddang.domain.game.mongddang.application;

import com.onetwo.mongddang.domain.game.mongddang.model.Mongddang;
import com.onetwo.mongddang.domain.game.mongddang.repository.MongddangRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MongddangUitils {

    private final MongddangRepository mongddangRepository;

    // 몽땅 추가
    @Transactional
    public void addMongddang(String name, int price, String story) {
        log.info("addMongddang");

        Mongddang mongddang = Mongddang.builder()
                .name(name) // "멍멍이"
                .price(price) // 0
                .story(story) // "우주를 여행하다 우리집에 불시착한 몽땅족의 멍멍이"
                .build();

        mongddangRepository.save(mongddang);

        log.info("addMongddang success name: {}", name);
    }
}
