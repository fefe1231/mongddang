package com.onetwo.mongddang.domain.vital.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ResponseDateGlucoseDto {

    private final List<ResponseSolidGlucoseDto> bloodSugar;
}