package com.onetwo.mongddang.domain.vital.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.onetwo.mongddang.domain.vital.model.GlucoseStatusType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ResponseSolidGlucoseDto {
    @NotNull
    private long id;

    @NotNull
    private int bloodSugarLevel;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime measurementTime;

    private String content;

    @NotNull
    private GlucoseStatusType status;

    @NotNull
    private boolean isNotification;
}
