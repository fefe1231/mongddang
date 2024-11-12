import { BloodSugarChart } from '@/widgets/blood-sugar-chart/ui';
import { TopBar } from '@/shared/ui/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { TabMenu } from '@/shared/ui/TabMenu/indes';
import { useQuery } from '@tanstack/react-query';
import { DayRecordQueries } from '@/entities/day-record/api';
import { useUserStore } from '@/entities/user/model/store';
import { useShallow } from 'zustand/shallow';

export const DayRecordPage = () => {
  const nav = useNavigate();
  const { date } = useParams();
  if (typeof date === 'undefined') {
    throw new Error('Impossible date');
  }

  const handleTabChange = (tabId: string) => {
    console.log(tabId);
  };
  const { getUser } = useUserStore(
    useShallow((state) => ({
      getUser: state.getUser,
    }))
  );
  const nickname = getUser()?.nickname ?? 'test';

  const { data, isError, isLoading } = useQuery(
    DayRecordQueries.todayRecordQuery(nickname, date)
  );

  if (isError) {
    console.log('Error in TodayRecordPage');
    throw new Error('Error in TodayRecordPage');
  }

  if (isLoading) return null;

  return (
    <>
      <header>
        <TopBar type="iconpage" iconHandler={() => nav(-1)}>
          내 기록
        </TopBar>
      </header>
      <section>
        <BloodSugarChart date={date} />
      </section>
      <section>
        <TabMenu
          contents={[<div>1</div>, <div>2</div>, <div>3</div>, <div>4</div>]}
          onTabChange={handleTabChange}
        />
      </section>
    </>
  );
};
