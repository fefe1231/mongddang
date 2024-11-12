package com.onetwo.mongddang.domain.vital.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.domain.user.error.CustomUserErrorCode;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.domain.vital.dto.ResponseDailyGlucoseDto;
import com.onetwo.mongddang.domain.vital.model.Vital;
import com.onetwo.mongddang.domain.vital.repository.VitalRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class VitalService {

    private final VitalRepository vitalRepository;
    private final UserRepository userRepository;


    public ResponseDto getBloodSugar(Long userId, String nickname, LocalDate date) {
        log.info("getBloodSugar userId: {}, nickname: {}", userId, nickname);

        User child = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new RestApiException(CustomUserErrorCode.USER_NOT_FOUND));

        List<Vital> todayVital = vitalRepository.findByChildAndMeasurementTimeBetween(child, date.atStartOfDay(), date.atTime(23, 59, 59));

        List<ResponseDailyGlucoseDto> responseDailyGlucoseDto = new ArrayList<>();
        for (Vital vital : todayVital) {
            responseDailyGlucoseDto.add(ResponseDailyGlucoseDto.builder()
                    .id(vital.getId())
                    .bloodSugarLevel(vital.getBloodSugarLevel())
                    .measurementTime(vital.getMeasurementTime())
                    .content(null)
                    .status(ResponseDailyGlucoseDto.Status.valueOf(vital.getStatus().name()))
                    .notification(vital.getIsNotification())
                    .build());
        }

        return ResponseDto.builder()
                .message("일일 혈당 기록 조회 성공")
                .data(responseDailyGlucoseDto)
                .build();
    }
}
