import { api } from '../interceptors';
import { BloodsugarResponse } from './blood-sugar.type';

export class BloodsugarService {
  static bloodSugarQuery(nickname: string, date: string) {
    return api.get<BloodsugarResponse>(`/api/bloodsuger/${nickname}/${date}`);
  }
}
