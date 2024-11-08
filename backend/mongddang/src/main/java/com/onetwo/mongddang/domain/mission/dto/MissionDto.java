package com.onetwo.mongddang.domain.mission.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MissionDto {

    private MissionName name; // 미션 이름

    private Long rewards; // 보상

    @Enumerated(EnumType.STRING)
    private Status status; // 미션 표시 상태

    public enum MissionName {
        breakfast(4L),
        lunch(4L),
        dinner(4L),
        first_medication(2L),
        second_medication(2L),
        third_medication(2L),
        forth_medication(2L),
        fifth_medication(2L),
        exercise(5L);

        private final Long rewards;

        MissionName(Long rewards) {
            this.rewards = rewards;
        }

        public Long getRewards() {
            return rewards;
        }
    }

    // rewardable/notRewardable/alreadyRewarded enum 작성
    public enum Status {
        rewardable, not_rewardable, already_rewarded
    }
}
