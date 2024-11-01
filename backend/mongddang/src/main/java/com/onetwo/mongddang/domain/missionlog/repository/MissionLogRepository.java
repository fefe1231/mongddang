package com.onetwo.mongddang.domain.missionlog.repository;

import com.onetwo.mongddang.domain.missionlog.model.MissionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MissionLogRepository extends JpaRepository<MissionLog, Long> {
}
