export type RecordCategory = 'food' | 'exercise' | 'sleep' | 'medicine';

export interface RecordFilter {
  nickname: string;
  date: string;
  category?: RecordCategory;
}