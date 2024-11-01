package com.onetwo.mongddang.domain.record.repository;

import com.onetwo.mongddang.domain.record.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
}
