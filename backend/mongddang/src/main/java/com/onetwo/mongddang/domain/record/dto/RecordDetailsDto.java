package com.onetwo.mongddang.domain.record.dto;

import com.onetwo.mongddang.domain.medication.dto.MedicationDto;
import com.onetwo.mongddang.domain.record.model.Record;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class RecordDetailsDto {
    private List<Record> meal;
    private List<Record> exercise;
    private List<Record> sleep;
    private List<MedicationDto> medication;
}
