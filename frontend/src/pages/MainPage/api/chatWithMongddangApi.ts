import { api } from '@/shared/api/interceptors';
import { AxiosResponse } from 'axios';

const START_GREETING = '안녕 반가워!';

interface StartChatWithMongddangResponse {
  prompt: string;
  message: string;
}

export const startChatWithMongddang = (): Promise<
  AxiosResponse<StartChatWithMongddangResponse>
> => {
  return api({
    method: 'POST',
    data: {
      message: START_GREETING,
    },
    url: '/api/chat/mongddang/start',
  })
    .then((res) => {
      console.log('startChatWithMongddang 응답', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const chatWithMongddang = (
  message: string
): Promise<AxiosResponse<string>> => {
  return api({
    method: 'POST',
    url: '/api/chat/mongddang',
    data: {
      message,
    },
  })
    .then((res) => {
      console.log('chatWithMongddang 응답', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};