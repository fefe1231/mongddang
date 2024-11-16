import { sendTokenToServer } from '@/shared/api/push-notification/pushNotificationApi';
import { PushNotifications } from '@capacitor/push-notifications';

// 푸시 알림 권한 설정
export const initPushNotification = async () => {
  console.log('알림 권한 요청 실행됨');
  const { receive } = await PushNotifications.checkPermissions();
  console.log('알림 권한 요청 실행됨 2', receive);
  if (receive !== 'granted') {
    const requestResult = await PushNotifications.requestPermissions();
    console.log('알림 권한 없어서 요청 실행됨 3', receive);

    if (requestResult.receive !== 'granted') {
      console.log('권한이 거부됨');
      return;
    }
  }
  console.log('알림 권한 확인됨 등록함수 실행', receive);

  try {
    await PushNotifications.register();
    console.log('알림 권한이 허용됨');
  } catch (error) {
    console.error('알림 에러 발생', error);
  }

  PushNotifications.addListener('registration', (token) => {
    console.log('푸시 알림 토큰 등록 완료', token.value);
    sendTokenToServer(token.value);
  });

  PushNotifications.addListener('registrationError', (error) => {
    console.error('푸시 알림 등록 실패:', error);
  });
};
