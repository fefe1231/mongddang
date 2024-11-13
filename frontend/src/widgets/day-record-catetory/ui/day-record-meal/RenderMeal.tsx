/** @jsxImportSource @emotion/react */
import { useQuery } from '@tanstack/react-query';
import {
  activeDotStyle,
  dotContainer,
  dotStyle,
  imgBox,
  inactiveDotStyle,
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

interface RenderMealProps {
  nickname: string;
  date: string;
}

export const RenderMeal = ({ nickname, date }: RenderMealProps) => {
  // const mealData = recordsData?.records.meal;
  const [isTap, setIsTap] = useState<IndexedToggleState>({});
  const { data: mealData } = useQuery(
    DayRecordQueries.mealRecordsQuery(nickname, date)
  ) as { data: MealRecord[] };

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
              <span
                css={[
                  dotStyle,
                  isTap[index] ? activeDotStyle : inactiveDotStyle,
                ]}
              />
              <span
                css={[
                  dotStyle,
                  !isTap[index] ? activeDotStyle : inactiveDotStyle,
                ]}
              />
            </div>
          </div>
          <div css={mealTextBox}>content</div>
        </div>
      ))}
    </section>
  );
};
