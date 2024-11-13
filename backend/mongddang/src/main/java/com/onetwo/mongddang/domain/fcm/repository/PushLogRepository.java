package com.onetwo.mongddang.domain.fcm.repository;

import com.onetwo.mongddang.domain.fcm.model.PushLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PushLogRepository extends JpaRepository<PushLog, Long> {
    Page<PushLog> findAllByUserId(Long userId, Pageable pageable);

    Boolean existsByUserIdAndIsNewTrue(Long userId);
}
