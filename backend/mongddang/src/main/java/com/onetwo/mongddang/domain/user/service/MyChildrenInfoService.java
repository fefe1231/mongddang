package com.onetwo.mongddang.domain.user.service;

import com.onetwo.mongddang.common.responseDto.ResponseDto;
import com.onetwo.mongddang.domain.user.error.CustomUserErrorCode;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.CtoPRepository;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import com.onetwo.mongddang.errors.exception.RestApiException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MyChildrenInfoService {

    private final UserRepository userRepository;
    private final CtoPRepository ctoPRepository;

    @Transactional
    public ResponseDto checkNickname(Long userId) {

        //사용자
        Optional<User> user = userRepository.findById(userId);

        // 사용자 유무 판단
        if (user.isEmpty()) {
            throw new RestApiException(CustomUserErrorCode.USER_NOT_FOUND);
        }
        log.info("Existing User : {}", userId);

        // 사용자가 보호자인지 판단
        if (!Objects.equals(user.get().getRole().toString(), "protector")) {
            throw new RestApiException(CustomUserErrorCode.NOT_PROTECTOR);
        }
        log.info("This User is protector");

        // 연결된 어린이 리스트

        // data

        //response
        ResponseDto response = ResponseDto.builder()
                .message("사용 가능한 닉네임입니다.")
                .data(null)
                .build();
        return response;
    }
}
