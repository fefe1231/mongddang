/** @jsxImportSource @emotion/react */

import { BottomBar } from '@/shared/ui/BottomBar';
import { kidsMainBase } from './styles';

const KidsMainPage = () => {
  return (
    <div css={kidsMainBase}>
      <BottomBar
        icons={[
          '/img/%EB%A7%90%EB%9E%911.png',
          '/img/%EB%A7%90%EB%9E%912.png',
          '/img/%EB%A7%90%EB%9E%913.png',
        ]}
        menus={['도감', '메뉴', '기록']}
        onHandleChange={() => {}}
      />
    </div>
  );
};

export default KidsMainPage;
