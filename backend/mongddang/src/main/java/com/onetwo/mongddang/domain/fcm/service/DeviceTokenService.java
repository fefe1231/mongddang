package com.onetwo.mongddang.domain.fcm.service;

import com.onetwo.mongddang.domain.fcm.model.FcmToken;
import com.onetwo.mongddang.domain.fcm.repository.FcmTokenRepository;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeviceTokenService {

    private final FcmTokenRepository fcmTokenRepository;
    private final UserRepository userRepository;

    // 일단 user 한 명은 1개의 디바이스만 소유할 수 있다.
    public void saveOrUpdateToken(String token, Long userId) {
        Optional<FcmToken> existingToken = fcmTokenRepository.findByUserId(userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        if (existingToken.isPresent()) {
            log.info("fcm token 있음");
            FcmToken tokenRecord = existingToken.get();
            tokenRecord.updateToken(token); // 토큰 업데이트
            fcmTokenRepository.save(tokenRecord);  // 변경된 엔티티 저장
            log.info("fcm token 업데이트 완료");
        } else {
            log.info("fcm token 없음");
            FcmToken newToken = FcmToken.builder()
                    .user(user)
                    .token(token)
                    .updatedAt(LocalDateTime.now())
                    .createdAt(LocalDateTime.now())
                    .build();
            fcmTokenRepository.save(newToken); // 없으면 저장
            log.info("fcm token 저장 완료");

        }
    }

}
