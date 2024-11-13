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
} from './styles';

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

  const renderMeal = () => {
    const mealData = recordsData?.records.meal;
    return (
      <section css={mealContainer}>
        {mealData?.map((item) => (
          <div css={mealItem}>
            <div css={imgBox}>
              <img css={mealImg} src={`${item.imageUrl}`} />
              <div css={mealImgCover}>
                <span></span>
              </div>
            </div>
            <div css={mealTextBox}>contents</div>
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
