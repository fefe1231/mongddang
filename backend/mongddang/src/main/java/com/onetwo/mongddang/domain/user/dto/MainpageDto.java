package com.onetwo.mongddang.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MainpageDto {

    String nickname;
    Long mainMongddangId;
    String mainTitleName;
    int coin;

}
