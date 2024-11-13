import { useNearestBloodSugar } from '@/entities/day-record';
import { DayRecordQueries } from '@/entities/day-record/api';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { ExerciseRecord } from '@/shared/api/day-record';
import { useQuery } from '@tanstack/react-query';

interface RenderExerciseProps {
  nickname: string;
  date: string;
  bloodSugarData?: Bloodsugar[];
}

export const RenderExercise = ({
  nickname,
  date,
  bloodSugarData,
}: RenderExerciseProps) => {
  const { data, isError, isLoading } = useQuery<ExerciseRecord[]>(
    DayRecordQueries.exerciseRecordsQuery(nickname, date)
  );

  const nearestTimeBloodSugar = useNearestBloodSugar(data, bloodSugarData);

  if (isError) {
    console.log('Error in RenderExercise');
    throw new Error('Error in RenderExercise');
  }
  if (isLoading) return <div>Loading...</div>;

  // 빌드 에러 방지용
  console.log(nearestTimeBloodSugar);

  return <>
    test Exercise
  </>
};
