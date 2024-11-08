package com.onetwo.mongddang.domain.medication.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MedicationStandardDto {

    private Long minGlucose;
    private Long maxGlucose;

    //    @NotNull
    private Long volume;

}
