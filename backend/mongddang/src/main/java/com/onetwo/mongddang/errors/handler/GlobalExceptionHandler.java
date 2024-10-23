package com.onetwo.mongddang.errors.handler;

import com.onetwo.mongddang.errors.errorcode.CommonErrorCode;
import com.onetwo.mongddang.errors.errorcode.ErrorCode;
import com.onetwo.mongddang.errors.exception.RestApiException;
import com.onetwo.mongddang.errors.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RestApiException.class)
    public ResponseEntity<Object> handleQuizException(final RestApiException e) {
        log.warn("handleRestApiException", e);
        final ErrorCode errorCode = e.getErrorCode();
        return handleExceptionInternal(errorCode, e.getMessage()); // 예외 메시지를 추가
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgument(final IllegalArgumentException e) {
        final ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
        return handleExceptionInternal(errorCode, e.getMessage()); // 예외 메시지를 추가
    }

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(
            final MethodArgumentNotValidException e,
            final HttpHeaders headers,
            final HttpStatusCode status,
            final WebRequest request) {
        log.warn("handleIllegalArgument", e);
        final ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
        return handleExceptionInternal(e, errorCode);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> handleAllException(final Exception ex) {
        log.warn("handleAllException", ex);
        final ErrorCode errorCode = CommonErrorCode.INTERNAL_SERVER_ERROR;
        return handleExceptionInternal(errorCode, ex.getMessage()); // 예외 메시지를 추가
    }


    private ResponseEntity<Object> handleExceptionInternal(final ErrorCode errorCode) {
        Map<String, Object> responseBody = new HashMap<>();
        String message = makeErrorResponse(errorCode).getMessage();
        responseBody.put("ErrorMessage", message);
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(responseBody);
    }

    private ErrorResponse makeErrorResponse(final ErrorCode errorCode) {
        return ErrorResponse.builder()
                .status(errorCode.getHttpStatus().value())
                .httpStatus(errorCode.getHttpStatus())
                .code(errorCode.name())
                .message(errorCode.getMessage())
                .build();
    }

    // 메시지를 받는 handleExceptionInternal 메서드
    private ResponseEntity<Object> handleExceptionInternal(final ErrorCode errorCode, final String message) {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("ErrorMessage", message != null ? message : errorCode.getMessage()); // 메시지 우선
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(responseBody);
    }
    private ErrorResponse makeErrorResponse(final ErrorCode errorCode, final String message) {
        return ErrorResponse.builder()
                .code(errorCode.name())
                .message(message != null ? message : errorCode.getMessage())
                .build();
    }

    private ResponseEntity<Object> handleExceptionInternal(final BindException e, final ErrorCode errorCode) {
        Map<String, Object> responseBody = new HashMap<>();
        String message = makeErrorResponse(errorCode).getMessage();
        responseBody.put("ErrorMessage", message);
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(responseBody);
    }

    // InvalidDataAccessApiUsageException을 처리하는 핸들러
    @ExceptionHandler(InvalidDataAccessApiUsageException.class)
    public ResponseEntity<Object> handleInvalidDataAccessApiUsageException(final InvalidDataAccessApiUsageException e) {
        log.warn("InvalidDataAccessApiUsageException occurred", e);
        final ErrorCode errorCode = CommonErrorCode.INVALID_QUERY_PARAMETER;
        Map<String, String> responeBody = new HashMap<>();
        responeBody.put("ErrorMessage", errorCode.getMessage());
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(responeBody);
    }

    private ErrorResponse makeErrorResponse(final BindException e, final ErrorCode errorCode) {
        final List<ErrorResponse.ValidationError> validationErrorList = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(ErrorResponse.ValidationError::of)
                .collect(Collectors.toList());

        return ErrorResponse.builder()
                .code(errorCode.name())
                .message(errorCode.getMessage())
                .errors(validationErrorList)
                .build();
    }

    //파라미터 에러 잡기
    @Override
    protected ResponseEntity<Object> handleMissingPathVariable(
            MissingPathVariableException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {

        log.warn("handleMissingPathVariable", ex);

        final ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;  // 적절한 에러 코드 사용
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("ErrorMessage", "Required path variable '" + ex.getVariableName() + "' is not present.");

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(responseBody);
    }
}