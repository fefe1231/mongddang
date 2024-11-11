package com.onetwo.mongddang.domain.fcm.service;

import com.google.firebase.messaging.*;
import com.google.firebase.messaging.Notification;
import com.onetwo.mongddang.domain.fcm.errors.CustomFcmErrorCode;
import com.onetwo.mongddang.domain.fcm.model.FcmToken;
import com.onetwo.mongddang.domain.fcm.model.PushLog;
import com.onetwo.mongddang.domain.fcm.repository.FcmTokenRepository;
import com.onetwo.mongddang.domain.fcm.repository.PushLogRepository;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.errors.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class PushNotificationService {

    private final PushLogRepository pushLogRepository;
    private final FcmTokenRepository fcmTokenRepository;

    // 푸시 알림을 보내는 서비스
    public void sendPushNotification(User user, String title, String message, PushLog.Category category){
        // fcm토큰 찾기
        FcmToken token = fcmTokenRepository.findByUser(user)
                .orElseThrow(()-> new RestApiException(CustomFcmErrorCode.FCM_TOKEN_NOT_FOUND));

        String fcmToken = token.getToken();

        // 메시지 구성
        Message Noti_message = Message.builder()
                .setNotification(
                        Notification.builder()
                        .setTitle(title)   // 제목 설정
                        .setBody(message)  // 메시지 설정
                        .build()
                )
                .setToken(fcmToken)
                .build();

        // 메시지 전송 및 저장
        try {
            String response = FirebaseMessaging.getInstance().send(Noti_message);
            log.info("알림 메시지 전송!");
            // 푸시 로그 저장
            savePushNotification(user, message, category);
            log.info("알림 저장!");
        } catch (FirebaseMessagingException e) {
            throw new RestApiException(CustomFcmErrorCode.SEND_AND_SAVE_FAILED);
        }


    }

    // 보낸 푸시 알림을 알림 로그에 저장하는 서비스
    public void savePushNotification(User user, String content, PushLog.Category category){
        PushLog pushLog = PushLog.builder()
                .user(user)
                .is_new(true)
                .content(content)
                .category(category)
                .createdAt(LocalDateTime.now())
                .build();
        // PushLogRepository를 통해 저장
        pushLogRepository.save(pushLog);
    }
}
