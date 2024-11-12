import { DayRecordService } from '@/shared/api/day-record';
import { DayRecords } from '@/shared/api/day-record/day-record.types';
import { queryOptions } from '@tanstack/react-query';
import { RecordFilter } from '../model';

export class DayRecordQueries {
  static readonly queryKeys = {
    all: ['dayRecords'] as const,
    filtered: (filters: RecordFilter) =>
      [...this.queryKeys.all, { filters }] as const,
  };

  private static dayRecordQuery(nickname: string, date: string) {
    return queryOptions({
      queryKey: DayRecordQueries.queryKeys.all,
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

  private static filteredDayRecordQuery(filters: RecordFilter) {
    const baseQuery = this.dayRecordQuery(filters.nickname, filters.date);
    
    return queryOptions({
      queryKey: this.queryKeys.filtered(filters),
      queryFn: async () => {},
    });
  }
}
