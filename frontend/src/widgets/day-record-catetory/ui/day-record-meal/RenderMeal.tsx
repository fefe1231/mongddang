/** @jsxImportSource @emotion/react */
import { useQuery } from '@tanstack/react-query';
import {
  dotContainer,
  dotStyle,
  imgBox,
  mealContainer,
  mealImg,
  mealImgCover,
  mealItem,
  mealTextBox,
  visibleCover,
} from './styles';
import { DayRecordQueries } from '@/entities/day-record/api';
import { useState } from 'react';
import { IndexedToggleState } from './types';
import { MealRecord } from '@/shared/api/day-record';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { useNearestBloodSugar } from '@/entities/day-record';

interface RenderMealProps {
  nickname: string;
  date: string;
  bloodSugarData?: Bloodsugar[];
}

export const RenderMeal = ({
  nickname,
  date,
  bloodSugarData,
}: RenderMealProps) => {
  const [isTap, setIsTap] = useState<IndexedToggleState>({});
  const {
    data: mealData,
    isLoading,
    isError,
  } = useQuery<MealRecord[]>(DayRecordQueries.mealRecordsQuery(nickname, date));

  const nearestTimeBloodSugar = useNearestBloodSugar(mealData, bloodSugarData);

  if (isError) {
    console.log('Error in RenderMeal');
    throw new Error('Error in RenderMeal');
  }
  if (isLoading) return <div>Loading...</div>;

  return (
    <section css={mealContainer}>
      {mealData?.map((item, index) => (
        <div key={index} css={mealItem}>
          <div
            css={imgBox}
            onClick={() =>
              setIsTap((prev) => ({ ...prev, [index]: !prev[index] }))
            }
          >
            <img css={mealImg} src={`${item.imageUrl}`} />
            <div css={[mealImgCover, isTap[index] && visibleCover]}>
              <span>{item.content.join(', ')}</span>
            </div>
            <div css={dotContainer}>
              <span css={[dotStyle(isTap[index])]} />
            </div>
          </div>
          <div css={mealTextBox}>
            {bloodSugarData && nearestTimeBloodSugar[item.startTime]}
          </div>
        </div>
      ))}
    </section>
  );
};
