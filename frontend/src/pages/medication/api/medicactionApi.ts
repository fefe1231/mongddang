import { api } from '@/shared/api/interceptors';

export const getMedicationList = (nickname: string) => {
  return api({
    method: 'GET',
    url: '/api/medication',
    params: {
      nickname: nickname,
    },
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
