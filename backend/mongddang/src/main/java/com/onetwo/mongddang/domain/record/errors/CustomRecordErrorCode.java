package com.onetwo.mongddang.domain.record.errors;

import com.onetwo.mongddang.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CustomRecordErrorCode implements ErrorCode {

    EXERCISE_ALREADY_STARTED(HttpStatus.BAD_REQUEST, "RE000", "이미 운동이 시작되었습니다.");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
