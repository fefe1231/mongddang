import axios from 'axios';
import { api } from '../interceptors';
import { BloodsugarResponse } from './blood-sugar.type';

export class BloodsugarService {
  static bloodSugarQuery(nickname: string, date: string): Promise<BloodsugarResponse> {
    return nickname === 'test-chart-data'
      ? axios.get('/public/dummy/blood-sugar.json')
      : api.get(`/api/bloodsuger/${nickname}/${date}`);
  }
}
