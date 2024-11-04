package com.onetwo.mongddang.common.s3.errors;

import com.onetwo.mongddang.errors.errorcode.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CustomS3ErrorCode implements ErrorCode {
    IO_EXCEPTION_ON_IMAGE_UPLOAD(HttpStatus.BAD_REQUEST,"S000", "Io exception on image upload"),
    EMPTY_FILE_EXCEPTION(HttpStatus.NOT_FOUND, "S001","File exception empty"),
    NO_FILE_EXTENTION(HttpStatus.BAD_REQUEST, "S002","No file extention"),
    INVALID_FILE_EXTENTION(HttpStatus.NOT_FOUND, "S003","Invalid file extention"),
    PUT_OBJECT_EXCEPTION(HttpStatus.NOT_FOUND, "S004","Put object exeption"),
    IO_EXCEPTION_ON_IMAGE_DELETE(HttpStatus.NOT_FOUND, "S005","Io exception on image delete")
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
