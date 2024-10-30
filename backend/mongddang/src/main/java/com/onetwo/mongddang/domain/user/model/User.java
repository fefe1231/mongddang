package com.onetwo.mongddang.domain.user.model;

import com.nimbusds.openid.connect.sdk.claims.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.checkerframework.checker.units.qual.N;

import java.time.LocalDate;

@Entity
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @NotNull
    private LocalDate birth;

    private String invitationCode;

    @Column(nullable = false, length = 10)
    private String nickname;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;


    public enum Role {
        child, protector
    };

    public enum Gender {
        male, female
    };

}
