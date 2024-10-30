package com.onetwo.mongddang.domain.game.gameLog.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.onetwo.mongddang.domain.game.coinLog.model.CoinCategory;

public enum GameLogCategory {
    MEAL_COUNT, SLEEP_COUNT, EXERCISE_COUNT, MEDICATION_COUNT;

    @JsonCreator
    public static CoinCategory fromString(String value) {
        return CoinCategory.valueOf(value.toUpperCase());
    }
}
