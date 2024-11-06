package com.onetwo.mongddang.domain.medication.dto;

import lombok.Getter;

@Getter
public class MedicationStandard {

    private Long minGlucose;
    private Long maxGlucose;

    //    @NotNull
    private Long volume;

}
