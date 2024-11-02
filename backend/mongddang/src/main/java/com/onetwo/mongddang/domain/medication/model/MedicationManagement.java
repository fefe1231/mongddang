package com.onetwo.mongddang.domain.medication.model;

import com.onetwo.mongddang.domain.user.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="medication_management")
public class MedicationManagement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false, name = "child_id")
    @NotNull
    private User child;

    @NotNull
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    private RouteType route;

    @NotNull
    @Column(name="is_repeated")
    private Boolean isRepeated;

    @NotNull
    @Column(name="repeat_days")
    private String repeatDays;

    @NotNull
    @Column(name="repeat_start_time")
    private LocalDateTime repeatStartTime;

    @NotNull
    @Column(name="repeat_end_time")
    private LocalDateTime repeatEndTime;

    @NotNull
    public enum RouteType {
        mouth, injection
    }

}
