package com.onetwo.mongddang.domain.record.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class RequestMealStartDto {

    @NotBlank(message = "식사 내용은 필수입니다.")
    private String content; // 식사 내용

    @NotNull(message = "이미지는 필수입니다.")
    private String image; // 이미지 파일 (파일 경로 또는 URL)

    @NotNull(message = "식사 시간은 필수입니다.")
    @Pattern(regexp = "^(breakfast|lunch|dinner|snack)$", message = "식사 시간은 'breakfast', 'lunch', 'dinner', 'snack' 중 하나여야 합니다.")
    private String mealTime; // 식사 시간 (enum으로 처리)
}
