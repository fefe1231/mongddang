package com.onetwo.mongddang.domain.vital.controller;

import com.onetwo.mongddang.domain.vital.dto.ResponseDateGlucoseDto;
import com.onetwo.mongddang.domain.vital.model.Vital;
import com.onetwo.mongddang.domain.vital.service.SearchVitalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/bloodsugar")
@Tag(name="vital 기록 조회 api", description = "해당 환아의 혈당을 조회합니다.")
public class VitalController {

    private final SearchVitalService searchVitalService;
    @Operation(summary = "일일 혈당조회 api", description = "해당 날짜의 하루치 혈당기록을 조회할 수 있습니다.")
    @GetMapping("/{date}")
    public ResponseEntity<ResponseDateGlucoseDto> getThisdateGlucose(@PathVariable("date") String date, HttpServletRequest request){
        Long userId = 1L;
        ResponseDateGlucoseDto response = searchVitalService.SearchThisDayVitalService(userId, date);
        return ResponseEntity.ok(response);
    }
}
