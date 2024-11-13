export type RecordCategory = 'meal' | 'exercise' | 'sleep' | 'medication';

export interface RecordFilter {
  nickname: string;
  date: string;
  category: RecordCategory;
}
