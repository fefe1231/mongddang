package com.onetwo.mongddang.domain.game.coinLog.dto;

import com.onetwo.mongddang.domain.game.coinLog.model.CoinLog.CoinCategory;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RequestRewardCoinDto {

    private int coin;
    private CoinCategory category;

}
