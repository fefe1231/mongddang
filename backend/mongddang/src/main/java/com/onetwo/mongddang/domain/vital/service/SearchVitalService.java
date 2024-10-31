package com.onetwo.mongddang.domain.vital.service;

import com.onetwo.mongddang.common.ResponseDto;
import com.onetwo.mongddang.domain.vital.dto.ResponseSolidGlucoseDto;
import com.onetwo.mongddang.domain.vital.model.Vital;
import com.onetwo.mongddang.domain.vital.repository.VitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchVitalService {
    private final VitalRepository vitalRepository;
    public ResponseDto SearchThisDayVital(Long userId, String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        List<Vital> glucoseList = vitalRepository.findAllByDateAndChildId(localDate, userId);
        List<ResponseSolidGlucoseDto> solidGlucoseDtoList = new ArrayList<>();

        solidGlucoseDtoList = glucoseList.stream()
                .map(glucose -> ResponseSolidGlucoseDto.builder()
                        .id(glucose.getId())
                        .bloodSugarLevel(glucose.getBloodSugarLevel())
                        .content(glucose.getContent())
                        .status(glucose.getStatus())
                        .measurementTime(glucose.getMeasurementTime())
                        .isNotification(glucose.isNotification())
                        .build())
                .collect(Collectors.toList());
        Map<String,Object> result = new HashMap<>();
        result.put("bloodSugar", solidGlucoseDtoList);
        String inform = String.format("%s일 혈당 조회에 성공했습니다.", localDate);
        // ResponseDateGlucoseDto 객체를 빌더를 통해 생성
        ResponseDto responseDto = ResponseDto.builder()
                .code(200)
                .message(inform)
                .data(result)
                .build();
        return responseDto;
    }
}
