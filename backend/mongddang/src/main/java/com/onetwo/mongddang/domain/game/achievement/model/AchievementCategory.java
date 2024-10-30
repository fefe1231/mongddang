package com.onetwo.mongddang.domain.game.achievement.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.onetwo.mongddang.domain.game.coinLog.model.CoinCategory;

public enum AchievementCategory {
    MEAL, SLEEP, EXERCISE, MEDICATION;

    @JsonCreator
    public static CoinCategory fromString(String value) {
        return CoinCategory.valueOf(value.toUpperCase());
    }
}
