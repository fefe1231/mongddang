import { api } from '@/shared/api/interceptors';

export const saveDiet = (
  accessToken: string | null,
  mealTime: string,
  image: File | null,
  content: string
) => {
  const diet = JSON.stringify(content.split(','));
  const formData = new FormData();
  formData.append('mealTime', mealTime);
  if (image) {
    formData.append('image', image);
  } else {
    formData.append('image', '');
  }
  formData.append('content', diet);
  console.log('폼 데이터', formData);

  if (formData) {
    return api({
      method: 'POST',
      url: '/api/record/meal/start',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    })
      .then((res) => {
        console.log('식사시작됨', res.data);
        return res.data;
      })
      .catch((err) => {
        console.log('식사실패함', err);
      });
  }
  return;
};
