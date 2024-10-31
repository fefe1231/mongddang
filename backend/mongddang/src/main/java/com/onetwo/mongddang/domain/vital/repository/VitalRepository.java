package com.onetwo.mongddang.domain.vital.repository;

import com.onetwo.mongddang.domain.vital.model.Vital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface VitalRepository extends JpaRepository<Vital,Long> {
    @Query("SELECT e FROM Vital e WHERE function('date', e.measurementTime) = :date AND e.child.id = :childId")
    List<Vital> findAllByDateAndChildId(@Param("date") LocalDate date, @Param("childId") Long childId);
}
