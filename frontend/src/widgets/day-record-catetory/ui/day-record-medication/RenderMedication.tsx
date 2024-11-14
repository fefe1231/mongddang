import { useNearestBloodSugar } from '@/entities/day-record';
import { DayRecordQueries } from '@/entities/day-record/api';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { MedicationRecord } from '@/shared/api/day-record';
import { useQuery } from '@tanstack/react-query';

interface RenderMedicationProps {
  nickname: string;
  date: string;
  bloodSugarData?: Bloodsugar[];
}

export const RenderMedication = ({
  nickname,
  date,
  bloodSugarData,
}: RenderMedicationProps) => {
  const { data, isError, isLoading } = useQuery<MedicationRecord[]>(
    DayRecordQueries.medicationRecordsQuery(nickname, date)
  );

  const nearestTimeBloodSugar = useNearestBloodSugar(data, bloodSugarData);

  if (isError) {
    console.log('Error in RenderMedication');
    throw new Error('Error in RenderMedication');
  }
  if (isLoading) return <div>Loading...</div>;

  // 빌드 에러 방지용
  console.log('Prevent Error log', nearestTimeBloodSugar);

  return <>test Medication</>;
};
