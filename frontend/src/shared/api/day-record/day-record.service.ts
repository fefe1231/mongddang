import { AxiosResponse } from 'axios';
import { BaseApiResponse } from '../base.types';
import { DayRecordsResponse, RecordParams } from './day-record.types';
import { api } from '../interceptors';

export class DayRecordService {
  static dayRecordQuery(config: {
    params: RecordParams;
  }): Promise<AxiosResponse<BaseApiResponse<DayRecordsResponse>>> {
    return api.get('/api/record/day', config);
  }
}
