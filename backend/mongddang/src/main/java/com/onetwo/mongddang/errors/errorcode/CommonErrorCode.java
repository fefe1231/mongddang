package com.onetwo.mongddang.errors.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {

    INVALID_PARAMETER(HttpStatus.BAD_REQUEST,"G000","Invalid parameter included"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "G001","Resource not exists"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"G002", "Internal server error"),
    INVALID_QUERY_PARAMETER(HttpStatus.BAD_REQUEST,"G003", "Query parameter is invalid"),
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
