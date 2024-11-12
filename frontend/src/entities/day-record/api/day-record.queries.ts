import { DayRecordService } from '@/shared/api/day-record';
import { DayRecords } from '@/shared/api/day-record/day-record.types';
import { queryOptions } from '@tanstack/react-query';

export class DayRecordQueries {
  static readonly queryKeys = {
    all: ['dayRecords'] as const,
  };
  static todayRecordQuery(nickname: string, date: string) {
    return queryOptions({
      queryKey: [...this.queryKeys.all, date],
      queryFn: async (): Promise<DayRecords> => {
        const { data } = await DayRecordService.dayRecordQuery({
          params: {
            nickname,
            date,
          },
        });

        return data.data.dates[0];
      },
      enabled: !!nickname,
    });
  }
}
