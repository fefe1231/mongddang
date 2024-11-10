package com.onetwo.mongddang.domain.record.errors;

import com.onetwo.mongddang.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CustomRecordErrorCode implements ErrorCode {

    CHILD_ACCESS_DENIED(HttpStatus.FORBIDDEN, "RE000", "어린이는 본인의 기록만 조회할 수 있습니다."),
    PROTECTOR_ACCESS_DENIED(HttpStatus.FORBIDDEN, "RE001", "보호자는 연결된 어린이의 기록만 조회할 수 있습니다."),
    EXERCISE_ALREADY_STARTED(HttpStatus.BAD_REQUEST, "RE002", "이미 운동 기록이 시작되었습니다."),
    EXERCISE_NOT_STARTED(HttpStatus.BAD_REQUEST, "RE003", "운동 기록이 시작되지 않았습니다."),
    SLEEP_ALREADY_STARTED(HttpStatus.BAD_REQUEST, "RE004", "이미 수면 기록이 시작되었습니다."),
    SLEEP_NOT_STARTED(HttpStatus.BAD_REQUEST, "RE005", "수면 기록이 시작되지 않았습니다."),
    MEAL_ALREADY_STARTED(HttpStatus.BAD_REQUEST, "RE006", "이미 식사 기록이 시작되었습니다."),
    MEAL_NOT_STARTED(HttpStatus.BAD_REQUEST, "RE007", "식사 기록이 시작되지 않았습니다."),
    MEAL_RECORD_NOT_FOUND(HttpStatus.NOT_FOUND, "RE008", "식사 기록을 찾을 수 없습니다."),
    MEAL_ALREADY_ENDED(HttpStatus.BAD_REQUEST, "RE09", "이미 식사 기록이 종료되었습니다."),
    BAD_INGREDIENT_INPUT(HttpStatus.BAD_REQUEST, "RE010", "식재료 입력은 배열만 허용됩니다."),
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
