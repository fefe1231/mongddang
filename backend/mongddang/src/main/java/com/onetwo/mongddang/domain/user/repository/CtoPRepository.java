package com.onetwo.mongddang.domain.user.repository;

import com.onetwo.mongddang.domain.user.model.CtoP;
import com.onetwo.mongddang.domain.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CtoPRepository extends JpaRepository<CtoP, Long> {
    List<CtoP> findByChildAndProtector(User child, User protector);

    List<CtoP> findChildByProtector(User protector);
}
