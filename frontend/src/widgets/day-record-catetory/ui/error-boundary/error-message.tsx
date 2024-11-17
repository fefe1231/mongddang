import { RecordCategory } from "@/entities/day-record/api";
import { DayRecordError } from "@/entities/day-record/model";

interface ErrorMessageProps {
  error: Error | null;
  category: RecordCategory;
}

const categoryMessages: Record<RecordCategory, string> = {
  meal: '식사',
  medication: '투약',
  exercise: '운동',
  sleep: '수면'
};

export const ErrorMessage = ({ error, category }: ErrorMessageProps) => {
  if (error instanceof DayRecordError) {
    switch (error.code) {
      case 'NO_RECORDS':
        return <div>해당 날짜의 기록이 없습니다.</div>;
      case 'NO_CATEGORY_RECORDS':
        return <div>해당 날짜의 {categoryMessages[category]} 기록이 없습니다.</div>;
      case 'INVALID_STRUCTURE':
        return <div>데이터 구조가 올바르지 않습니다.</div>;
      default:
        return <div>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>;
    }
  }
  
  return <div>알 수 없는 오류가 발생했습니다.</div>;
};