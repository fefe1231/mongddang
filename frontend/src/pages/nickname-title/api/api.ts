
import { api } from '@/shared/api/interceptors';

export const getTitleInfo = () => {
  return api({
      method: 'GET',
      url: '/api/game/collection/achievement'
  })
  .then((res)=>{
      console.log('업적 정보 조회 성공', res.data)
      return res
  })
  .catch((err)=>{
      console.log('업적 정보 조회 실패', err.message)
  })
}


export const getTitleAchievement = (accessToken: string | null, achievementId: number) => {
  return api({
    method: 'post',
    url: '/api/game/collection/achievement/claim',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: achievementId
  })
  .then((res)=>{
    console.log(res.data)
    return res
  })
  .catch((err)=>{
    console.log(err)
  })
};


export const getTitleMain = (accessToken: string | null, titleId: number) => {
  return api({
    method: 'post',
    url: '/api/game/collection/achievement/claim',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: titleId
  })
  .then((res)=>{
    console.log(res.data)
    return res
  })
  .catch((err)=>{
    console.log(err)
  })
};