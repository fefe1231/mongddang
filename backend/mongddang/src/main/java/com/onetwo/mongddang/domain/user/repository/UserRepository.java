package com.onetwo.mongddang.domain.user.repository;

import com.onetwo.mongddang.domain.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
