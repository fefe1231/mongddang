import { BloodSugarChart } from '@/widgets/blood-sugar-chart/ui';
import { TopBar } from '@/shared/ui/TopBar';
import { useNavigate } from 'react-router-dom';
import { TabMenu } from '@/shared/ui/TabMenu/indes';

export const TodayRecordPage = () => {
  const nav = useNavigate();
  const handleTabChange = (tabId: string) => {
    console.log(tabId);
  };
  return (
    <>
      <header>
        <TopBar type="iconpage" iconHandler={() => nav(-1)}>
          내 기록
        </TopBar>
      </header>
      <section>
        <BloodSugarChart />
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
