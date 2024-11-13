/** @jsxImportSource @emotion/react */

import { TopBar } from '@/shared/ui/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { DayRecordCategory } from '@/widgets/day-record-catetory';
import { useUserStore } from '@/entities/user/model/store';
import { useShallow } from 'zustand/shallow';
import { useQuery } from '@tanstack/react-query';
import { BloodsugarQueries } from '@/entities/blood-sugar/api';
import { BloodSugarChart } from '@/widgets/blood-sugar-chart';
import { article, chart } from './style';

export const DayRecordPage = () => {
  const nav = useNavigate();
  const { date } = useParams();
  if (typeof date === 'undefined') {
    throw new Error('Impossible date');
  }
  const { getUser } = useUserStore(
    useShallow((state) => ({ getUser: state.getUser }))
  );
  const nickname = getUser()?.nickname ?? 'test';

  const {
    data: bloodSugarData,
    isError: isBloodSugarErr,
    isLoading: isBloodSugarLoading,
  } = useQuery(BloodsugarQueries.todayBloodSugarQuery(nickname, date));

  return (
    <>
      <header>
        <TopBar type="iconpage" iconHandler={() => nav(-1)}>
          내 기록
        </TopBar>
      </header>
      <article css={article}>
        <section css={chart}>
          {!isBloodSugarErr && !isBloodSugarLoading && (
            <BloodSugarChart data={bloodSugarData} />
          )}
        </section>
        <section>
          <DayRecordCategory
            nickname={nickname}
            bloodSugarData={bloodSugarData}
            date={date}
          />
        </section>
      </article>
    </>
  );
};
