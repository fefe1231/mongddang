package com.onetwo.mongddang.domain.record.errors;

import com.onetwo.mongddang.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CustomRecordErrorCode implements ErrorCode {

    CHILD_ACCESS_DENIED(HttpStatus.FORBIDDEN, "RE000", "아이는 본인의 기록만 조회할 수 있습니다."),
    PROTECTOR_ACCESS_DENIED(HttpStatus.FORBIDDEN, "RE000", "보호자는 연결된 아이의 기록만 조회할 수 있습니다."),
    EXERCISE_ALREADY_STARTED(HttpStatus.BAD_REQUEST, "RE000", "이미 운동이 시작되었습니다.");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
