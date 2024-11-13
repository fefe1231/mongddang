import { DayRecordService } from '@/shared/api/day-record';
import { queryOptions } from '@tanstack/react-query';
import { RecordFilter } from '../model';

export class DayRecordQueries {
  static readonly queryKeys = {
    all: ['dayRecords'] as const,
    filtered: (filters: RecordFilter) =>
      [...this.queryKeys.all, { filters }] as const,
  };

  // private static dayRecordQuery(nickname: string, date: string) {
  //   return queryOptions({
  //     queryKey: DayRecordQueries.queryKeys.all,
  //     queryFn: async (): Promise<DayRecords> => {
  //       const { data } = await DayRecordService.dayRecordQuery({
  //         params: {
  //           nickname,
  //           date,
  //         },
  //       });

  //       return data.data.dates[0];
  //     },
  //     enabled: !!nickname,
  //   });
  // }

  private static filteredDayRecordsQuery(filters: RecordFilter) {
    return queryOptions({
      queryKey: this.queryKeys.filtered(filters),
      queryFn: async () => {
        const { data } = await DayRecordService.dayRecordQuery({
          params: {
            nickname: filters.nickname,
            date: filters.date,
          },
        });

        const baseData = data.data.dates[0];

        switch (filters.category) {
          case 'exercise':
            return baseData.records.exercise;
          case 'meal':
            return baseData.records.meal;
          case 'medication':
            return baseData.records.medication;
          case 'sleep':
            return baseData.records.sleep;
          default:
            throw new Error('DayRecordQueries filter error');
        }
      },
      enabled: !!filters.nickname,
    });
  }

  // 각 카테고리별 편의 메서드
  static foodRecordsQuery(nickname: string, date: string) {
    return this.filteredDayRecordsQuery({
      nickname,
      date,
      category: 'meal',
    });
  }

  static exerciseRecordsQuery(nickname: string, date: string) {
    return this.filteredDayRecordsQuery({
      nickname,
      date,
      category: 'exercise',
    });
  }

  static sleepRecordsQuery(nickname: string, date: string) {
    return this.filteredDayRecordsQuery({
      nickname,
      date,
      category: 'sleep',
    });
  }

  static medicationRecordsQuery(nickname: string, date: string) {
    return this.filteredDayRecordsQuery({
      nickname,
      date,
      category: 'medication',
    });
  }
}
