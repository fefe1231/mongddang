package com.onetwo.mongddang.domain.missionlog.errors;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CustomMissionLogErrors {

    ALREADY_CREATED_MISSION(HttpStatus.BAD_REQUEST, "ALREADY_CREATED_MISSION", "이미 오늘의 미션을 생성했습니다."),
    ;


    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
