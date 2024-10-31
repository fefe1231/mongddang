package com.onetwo.mongddang.domain.game.mongddang.repository;

import com.onetwo.mongddang.domain.game.mongddang.model.MyMongddang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyMongddangRepository extends JpaRepository<MyMongddang, Long> {
    MyMongddang findByMongddangId(Long id);

    MyMongddang findByChildId(Long userId);
}
