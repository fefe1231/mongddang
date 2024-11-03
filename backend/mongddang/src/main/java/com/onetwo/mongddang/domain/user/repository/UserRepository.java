package com.onetwo.mongddang.domain.user.repository;

import com.onetwo.mongddang.domain.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByInvitationCode(String invitationCode);

    boolean existsByNickname(String nickname);

    Optional<User> findByInvitationCode(String InvitationCode);

    Optional<User> findByNickname(String nickname);
}
