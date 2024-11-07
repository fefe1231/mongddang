package com.onetwo.mongddang.domain.medication.repository;

import com.onetwo.mongddang.domain.medication.model.MedicationManagement;
import com.onetwo.mongddang.domain.medication.model.MedicationTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicationTimeRepository extends JpaRepository<MedicationTime, Long> {
    List<MedicationTime> findByMedicationManagement(MedicationManagement medicationManagement);
}
