package com.onetwo.mongddang.domain.medication.repository;

import com.onetwo.mongddang.domain.medication.model.MedicationManagement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicationManagementRepository extends JpaRepository<MedicationManagement, Long> {
}
