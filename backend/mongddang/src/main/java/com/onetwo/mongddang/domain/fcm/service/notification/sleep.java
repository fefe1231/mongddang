package com.onetwo.mongddang.domain.fcm.service.notification;

import com.onetwo.mongddang.domain.fcm.model.PushLog;
import com.onetwo.mongddang.domain.fcm.service.PushNotificationService;
import com.onetwo.mongddang.domain.user.model.User;
import com.onetwo.mongddang.domain.user.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class sleep {

    private final UserRepository userRepository;
    private final PushNotificationService pushNotificationService;

    public sleep(UserRepository userRepository, PushNotificationService pushNotificationService) {
        this.userRepository = userRepository;
        this.pushNotificationService = pushNotificationService;
    }

    @Scheduled(cron = "0 0 22 * * *") // 매일 22시에 실행
    public void sendSleepReminder() {
        // 안자고 있는 어린이 리스트
        LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.NOON); // 오늘 오후에 시작되는 수면 기록이 없어야 함
        LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);
        List<User> childrenList = userRepository.findChildUsersWithoutSleepingRecordToday(startOfDay, endOfDay);

        // 안자는 어린이들에게 알림 보내기
        for (User child : childrenList) {
            String message = "오후 10시입니다. 몽땅친구들과 함께 잠자리에 들 준비를 하는 건 어떨까요?";
            pushNotificationService.sendPushNotification(child, "취침 알림", message, PushLog.Category.game);
        }
    }
}
