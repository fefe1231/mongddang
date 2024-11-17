/** @jsxImportSource @emotion/react */

import { useNearestBloodSugar } from '@/entities/day-record';
import { DayRecordQueries } from '@/entities/day-record/api';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { MedicationRecord } from '@/shared/api/day-record';
import { useQuery } from '@tanstack/react-query';
import { imgBox, itemName, leftContainer, medicineItem, timeText } from './style';
import dayjs from 'dayjs';

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

  return (
    <section>
      {data &&
        data.map((item, index) => (
          <div key={index} css={medicineItem}>
            <div css={leftContainer}>
              <div css={itemName}>{item.content.name}</div>
              <div>{nearestTimeBloodSugar[item.startTime].startTime} mg/dl</div>
              <div>
                {item.content.volume}단위(U) |{' '}
                {item.content.route === 'injection' ? '주사' : '경구약'}
              </div>
              <div css={timeText}>{dayjs(item.startTime).format('HH:mm')}</div>
            </div>
            <div>
              <img css={imgBox} src={`${item.imageUrl}`} />
            </div>
          </div>
        ))}
    </section>
  );
};
