import { sendTokenToServer } from '@/shared/api/pushNotificationApi';
import { PushNotifications } from '@capacitor/push-notifications';

// 푸시 알림 권한 설정
export const initPushNotification = async () => {
  const { receive } = await PushNotifications.checkPermissions();
  if (receive !== 'granted') {
    const requestResult = await PushNotifications.requestPermissions();
    if (requestResult.receive !== 'granted') {
      console.log('권한이 거부됨');
      return;
    }
  }

  await PushNotifications.register();
  console.log('알림 권한이 허용됨');

  PushNotifications.addListener('registration', (token)=>{
    console.log('푸시 알림 토큰 등록 완료', token.value)
    sendTokenToServer(token.value)
  })

};
