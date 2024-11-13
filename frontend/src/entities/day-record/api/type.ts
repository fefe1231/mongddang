import {
  ExerciseRecord,
  MealRecord,
  MedicationRecord,
  SleepRecord,
} from '@/shared/api/day-record';

export interface DayRecordTypes {
  exercise: ExerciseRecord[];
  meal: MealRecord[];
  medication: MedicationRecord[];
  sleep: SleepRecord[];
}

export type RecordCategory = keyof DayRecordTypes;
export type RecordType<T extends RecordCategory> = DayRecordTypes[T];

export interface RecordFilter {
  nickname: string;
  date: string;
  category: RecordCategory;
}
