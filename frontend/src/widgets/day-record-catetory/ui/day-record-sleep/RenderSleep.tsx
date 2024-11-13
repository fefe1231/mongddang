import { DayRecordQueries } from '@/entities/day-record/api';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { SleepRecord } from '@/shared/api/day-record';
import { useQuery } from '@tanstack/react-query';

interface RenderSleepProps {
  nickname: string;
  date: string;
  bloodSugarData?: Bloodsugar[];
}

export const RenderSleep = ({
  nickname,
  date,
  bloodSugarData,
}: RenderSleepProps) => {
  const { data, isError, isLoading } = useQuery<SleepRecord[]>(
    DayRecordQueries.sleepRecordsQuery(nickname, date)
  );

  if (isError) {
    console.log('Error in RenderSleep');
    throw new Error('Error in RenderSleep');
  }
  if (isLoading) return <div>Loading...</div>;

  // 빌드 에러 방지용
  console.log(bloodSugarData, data);

  return <>test Sleep</>;
};
