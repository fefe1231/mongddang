import { TopBar } from '@/shared/ui/TopBar';
import { useNavigate } from 'react-router-dom';

export const RecordPage = () => {
  const nav = useNavigate();
  return (
    <>
      <header>
        <TopBar type="iconpage" iconHandler={() => nav(-1)}>
          내 기록
        </TopBar>
      </header>
      <div>record page</div>
    </>
  );
};
