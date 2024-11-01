package com.onetwo.mongddang;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
//converter 사용시 @CreatedDate 사용 위해 어노테이션 추가
@EnableJpaAuditing
public class MongddangApplication {

	public static void main(String[] args) {
		SpringApplication.run(MongddangApplication.class, args);
	}

}
