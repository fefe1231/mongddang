package com.onetwo.mongddang.domain.game.coinLog.model;

import com.onetwo.mongddang.domain.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity // JPA Entity 로 사용
@Getter // Getter 자동 생성
@Builder // 빌더 패턴
@AllArgsConstructor
public class CoinLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 재화 로그 ID

    @ManyToOne // 여러 CoinLog가 하나의 ChildUser에 연결
    @JoinColumn(nullable = false) // 외래키 설정
    private User child; // 연결된 어린이 유저

    @Column(nullable = false)
    private Integer coin; // 재화 획득량 (ex. 100)

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CoinCategory category; // 획득 경로 (ex. mission/mongddang/achievement)

}
