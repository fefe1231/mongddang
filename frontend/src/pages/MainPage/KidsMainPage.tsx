/** @jsxImportSource @emotion/react */

import { BottomBar } from '@/shared/ui/BottomBar';
import { kidsMainBase, topContainer } from './styles';
import ProfileStatus from './ui/ProfileStatus/ProfileStatus';

const KidsMainPage = () => {
  return (
    <div css={kidsMainBase}>
      {/* 프로필 상태창 */}
      <div css={topContainer}>
        <ProfileStatus />
      </div>

      {/* 바텀바 */}
      <BottomBar
        icons={[
          '/img/%EB%A7%90%EB%9E%911.png',
          '/img/%EB%A7%90%EB%9E%912.png',
          '/img/%EB%A7%90%EB%9E%913.png',
        ]}
        menus={['몽땅 도감', '메뉴', '일일 기록']}
        onHandleChange={() => {}}
      />
    </div>
  );
};

export default KidsMainPage;
