package com.onetwo.mongddang.domain.fcm.model;

import com.onetwo.mongddang.domain.user.model.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class FcmToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;
    private String token;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
