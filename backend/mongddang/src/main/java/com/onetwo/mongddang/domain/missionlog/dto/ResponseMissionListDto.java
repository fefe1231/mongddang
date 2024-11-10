package com.onetwo.mongddang.domain.missionlog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMissionListDto {

    private MissionDto.Mission name;
    private Long reward;
    private MissionDto.Status status;

}