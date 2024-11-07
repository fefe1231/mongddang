package com.onetwo.mongddang.domain.medication.repository;

import com.onetwo.mongddang.domain.medication.model.MedicationManagement;
import com.onetwo.mongddang.domain.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicationManagementRepository extends JpaRepository<MedicationManagement, Long> {
    List<MedicationManagement> findByChild(User child);
}
