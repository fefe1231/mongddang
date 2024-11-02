package com.onetwo.mongddang.domain.user.repository;

import com.onetwo.mongddang.domain.user.model.CtoP;
import com.onetwo.mongddang.domain.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CtoPRepository extends JpaRepository<CtoP, Long> {
    @Query("SELECT c FROM CtoP c WHERE c.child = :child AND c.protector = :protector")
    List<CtoP> findByChildAndProtector(@Param("protector") User protector,@Param("child") User child);

    // 보호자 id를 통해, 연결된 어린이 정보들을 리스트 형식으로 조회합니다.
    @Query("SELECT c.child FROM CtoP c WHERE c.protector.id = :protectorId")
    List<User> findChildByProtectorId(@Param("protectorId") Long protectorId);
}
