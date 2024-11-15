import { api } from './interceptors';

export const sendTokenToServer = async (token: string) => {
  await api({
    method: 'POST',
    url: '/api/fcm/token',
    data: {
      fcmToken: token,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
