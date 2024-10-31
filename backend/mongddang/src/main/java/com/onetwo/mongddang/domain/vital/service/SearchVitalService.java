package com.onetwo.mongddang.domain.vital.service;

import com.onetwo.mongddang.domain.vital.dto.ResponseDateGlucoseDto;
import com.onetwo.mongddang.domain.vital.dto.ResponseSolidGlucoseDto;
import com.onetwo.mongddang.domain.vital.model.Vital;
import com.onetwo.mongddang.domain.vital.repository.VitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchVitalService {
    private final VitalRepository vitalRepository;
    public ResponseDateGlucoseDto SearchThisDayVitalService(Long userId, String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate localDate = LocalDate.parse(date, formatter);
//        LocalDateTime startOfDay = localDate.atStartOfDay();
//        LocalDateTime endOfDay = localDate.atTime(LocalTime.MAX);
        List<Vital> glucoseList = vitalRepository.findAllByDateAndChildId(localDate, userId);
        // glucoseList를 ResponseSolidGlucoseDto 객체 리스트로 변환
        List<ResponseSolidGlucoseDto> solidGlucoseDtoList = glucoseList.stream()
                .map(glucose -> ResponseSolidGlucoseDto.builder()
                        .id(glucose.getId())
                        .bloodSugarLevel(glucose.getBloodSugarLevel())
                        .content(glucose.getContent())
                        .status(glucose.getStatus())
                        .measurementTime(glucose.getMeasurementTime())
                        .isNotification(glucose.isNotification())
                        .build())
                .collect(Collectors.toList());

        // ResponseDateGlucoseDto 객체를 빌더를 통해 생성
        ResponseDateGlucoseDto responseDateGlucoseDto = ResponseDateGlucoseDto.builder()
                .bloodSugar(solidGlucoseDtoList)
                .build();
        return responseDateGlucoseDto;
    }
}
