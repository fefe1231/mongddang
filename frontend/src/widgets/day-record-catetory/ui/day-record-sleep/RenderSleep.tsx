/** @jsxImportSource @emotion/react */

import { DayRecordQueries } from '@/entities/day-record/api';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { SleepRecord } from '@/shared/api/day-record';
import { useQuery } from '@tanstack/react-query';
import { sleepItem, textBox } from './style';
import { useNearestBloodSugar } from '@/entities/day-record';
import { calcTimeDuration } from '../../lib/calcTimeDuration';

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

  const nearestTimeBloodSugar = useNearestBloodSugar(data, bloodSugarData);

  if (isError) {
    console.log('Error in RenderSleep');
    throw new Error('Error in RenderSleep');
  }
  if (isLoading) return <div>Loading...</div>;

  // 빌드 에러 방지용
  console.log('Prevent Error log', bloodSugarData, data);

  return (
    <section>
      {data &&
        data.map((item, index) => (
          <div key={index} css={sleepItem}>
            <div css={textBox}>
              <div>
                <span>
                  잠자기 전 혈당 :{' '}
                  {nearestTimeBloodSugar[item.startTime].startTime} mg/dl
                </span>
              </div>
              <div>
                <span>
                  깨어난 후 혈당 :{' '}
                  {nearestTimeBloodSugar[item.startTime].endTime !== null
                    ? nearestTimeBloodSugar[item.startTime].endTime + 'mg/dl'
                    : '기록 없음'}
                </span>
              </div>
            </div>
            <div>
              <span>
                수면시간 {calcTimeDuration(item.startTime, item.endTime ?? '')}
                {item.endTime !== null ? '분' : ''}
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};
