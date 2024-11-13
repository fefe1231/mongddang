/** @jsxImportSource @emotion/react */

import { DayRecordQueries } from '@/entities/day-record/api';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { TabMenu } from '@/shared/ui/TabMenu/indes';
import { useQuery } from '@tanstack/react-query';
import {
  imgBox,
  mealContainer,
  mealImg,
  mealImgCover,
  mealItem,
  mealTextBox,
  visibleCover,
} from './styles';
import { useState } from 'react';
import { IndexedToggleState } from './types';

interface DayRecordCategoryProps {
  date: string;
  bloodSugarData: Bloodsugar[] | undefined;
  nickname: string;
}

export const DayRecordCategory = ({
  date,
  bloodSugarData,
  nickname,
}: DayRecordCategoryProps) => {
  const { data: recordsData } = useQuery(
    DayRecordQueries.allRecordsQuery(nickname, date)
  );
  const [isTap, setIsTap] = useState<IndexedToggleState>({});

  const renderMeal = () => {
    const mealData = recordsData?.records.meal;

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
            </div>
            <div css={mealTextBox}>content</div>
          </div>
        ))}
      </section>
    );
  };
  const renderExercise = () => {
    return <div>exercise</div>;
  };
  const renderMedication = () => {
    return <div>Medication</div>;
  };
  const renderSleep = () => {
    return <div>Sleep</div>;
  };

  const handleTabChange = (tabId: string) => {
    console.log(tabId);
  };

  return (
    <>
      <TabMenu
        contents={[
          renderMeal(),
          renderExercise(),
          renderMedication(),
          renderSleep(),
        ]}
        onTabChange={handleTabChange}
      />
    </>
  );
};
