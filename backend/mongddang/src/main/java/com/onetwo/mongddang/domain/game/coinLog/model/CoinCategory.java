package com.onetwo.mongddang.domain.game.coinLog.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum CoinCategory {
    MISSION, MONGDDANG, ACHIEVEMENT;

    @JsonCreator
    public static CoinCategory fromString(String value) {
        return CoinCategory.valueOf(value.toUpperCase());
    }
}
