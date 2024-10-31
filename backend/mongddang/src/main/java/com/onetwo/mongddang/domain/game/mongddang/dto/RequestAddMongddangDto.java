package com.onetwo.mongddang.domain.game.mongddang.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RequestAddMongddangDto {

    private String name;
    private int price;
    private String story;

}
