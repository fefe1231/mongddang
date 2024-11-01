package com.onetwo.mongddang.domain.missionlog.model;

import com.onetwo.mongddang.domain.record.model.Record;
import com.onetwo.mongddang.domain.user.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="mission_log")
@EntityListeners(AuditingEntityListener.class)
public class MissionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false, name="child_id")
    private User child;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Record.RecordCategoryType category;

    @CreatedDate
    @NotNull
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

}
