import { api } from '@/shared/api/interceptors';

export const getMainInfo = () => {
  return api({
    method: 'GET',
    url: '/api/main',
  })
    .then((res) => {
      console.log('메인페이지 정보 조회 성공', res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log('메인페이지 정보 조회 실패', err.message);
    });
};

export const getDailyMission = () => {
  return api({
    method: 'GET',
    url: '/api/mission',
  })
    .then((res) => {
      console.log(res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
