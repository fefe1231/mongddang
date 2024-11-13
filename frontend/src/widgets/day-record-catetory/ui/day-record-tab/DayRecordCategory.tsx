/** @jsxImportSource @emotion/react */

import { DayRecordQueries } from '@/entities/day-record/api';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { TabMenu } from '@/shared/ui/TabMenu/indes';
import { useQuery } from '@tanstack/react-query';
import { RenderMeal } from '../day-record-meal/RenderMeal';

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
          <RenderMeal
            nickname={nickname}
            date={date}
            bloodSugarData={bloodSugarData}
          />,
          renderExercise(),
          renderMedication(),
          renderSleep(),
        ]}
        onTabChange={handleTabChange}
      />
    </>
  );
};
