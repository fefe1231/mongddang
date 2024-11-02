package com.onetwo.mongddang.domain.game.title.repository;

import com.onetwo.mongddang.domain.game.title.model.MyTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MyTitleRepository extends JpaRepository<MyTitle, Long> {

    Optional<MyTitle> findByTitleId(Long id);

    Optional<MyTitle> findByChildIdAndIsMainTrue(Long ChildId);

}
