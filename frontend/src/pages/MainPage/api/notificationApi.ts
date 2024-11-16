import { api } from '@/shared/api/interceptors';

export const getNotification = () => {
  api({
    method: 'GET',
    url: '/api/push/log?page=1&size=10',
  })
    .then((res) => {
      console.log(res.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const readNotification = (notificationId: number) => {
  api({
    method: 'PATCH',
    url: '/api/push/read',
    data: {
      NotificationId: notificationId,
    },
  })
    .then((res) => {
      console.log('알림 삭제 성공', res.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
