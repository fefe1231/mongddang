package com.onetwo.mongddang.domain.game.gameLog.model;

import com.onetwo.mongddang.domain.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity // JPA Entity 로 사용
@Getter // Getter 자동 생성
@RequiredArgsConstructor // 필수 생성자
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자를 생성
@Builder // 빌더 패턴
public class GameLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 게임 로그 ID

    @ManyToOne // 여러 GameLog 가 하나의 ChildUser 에 연결
    @JoinColumn(nullable = false) // 외래키 설정
    private User child; // 연결된 어린이 유저

    @Column(nullable = false)
    private Integer mealCount; // 식사 횟수 (ex. 3)

    @Column(nullable = false)
    private Integer exerciseCount; // 운동 횟수 (ex. 2)

    @Column(nullable = false)
    private Integer sleepCount; // 수면 횟수 (ex. 1)

    @Column(nullable = false)
    private Integer medicationCount; // 복약 횟수 (ex. 5)

}