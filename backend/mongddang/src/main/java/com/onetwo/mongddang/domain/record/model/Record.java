package com.onetwo.mongddang.domain.record.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.onetwo.mongddang.domain.record.converter.JsonConverter;
import com.onetwo.mongddang.domain.user.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="child_id", nullable = false)
    private User child;

    @NotNull
    @Enumerated(EnumType.STRING)
    private RecordCategoryType category;

    @NotNull
    @Column(nullable = false, name="start_time")
    private LocalDateTime startTime;

    @Column(name="end_time")
    private LocalDateTime endTime;

    @Lob
    @Convert(converter = JsonConverter.class)
    private JsonNode content;

    @Column(name="image_url")
    private String imageUrl;

    @NotNull
    @Column(name="is_done")
    private Boolean isDone;

    @Column(name="meal_time")
    @Enumerated(EnumType.STRING)
    @NotNull
    private MealTimeType mealTime;

    @NotNull
    public enum RecordCategoryType {
        meal, sleep,exercise,medication
    }

    @NotNull
    public enum MealTimeType {
        breakfast, lunch,dinner,snack
    }


}
