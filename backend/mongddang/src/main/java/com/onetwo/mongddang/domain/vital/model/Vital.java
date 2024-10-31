package com.onetwo.mongddang.domain.vital.model;

import com.onetwo.mongddang.domain.user.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Vital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne // 여러 CoinLog가 하나의 ChildUser에 연결
    @JoinColumn(nullable = false) // 외래키 설정
    @NotNull
    private User child; // 연결된 어린이 유저

    @Column(nullable = false, name = "blood_sugar_level")
    @NotNull
    private int bloodSugarLevel;

    @Column(nullable = false, name = "measurement_time")
    @NotNull
    private LocalDateTime measurementTime;

    private String content;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull
    private GlucoseStatusType status;

    @Column(nullable = false, name = "is_notification")
    @NotNull
    private boolean isNotification;

}
