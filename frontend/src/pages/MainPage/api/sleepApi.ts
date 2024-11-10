import { api } from '@/shared/api/interceptors';

export const startSleep = () => {
  return api({
    method: 'POST',
    url: '/api/record/sleep/start',
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
