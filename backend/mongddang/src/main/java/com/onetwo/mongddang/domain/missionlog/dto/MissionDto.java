package com.onetwo.mongddang.domain.missionlog.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class MissionDto {

    public enum Status {
        rewardable, not_rewardable, already_rewarded
    }

    public enum Mission {
        breakfast, lunch, dinner, first_medication, second_medication, third_medication, exercise;
    }

}
