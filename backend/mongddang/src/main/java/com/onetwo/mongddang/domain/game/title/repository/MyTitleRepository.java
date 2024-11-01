package com.onetwo.mongddang.domain.game.title.repository;

import com.onetwo.mongddang.domain.game.title.model.MyTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyTitleRepository extends JpaRepository<MyTitle, Long> {

    MyTitle findByTitleId(Long id);

    MyTitle findByChildId(Long titleId);
}
