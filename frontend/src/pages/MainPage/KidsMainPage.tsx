/** @jsxImportSource @emotion/react */

import { BottomBar } from '@/shared/ui/BottomBar';
import {
  iconGroupCss,
  iconHorizontalCss,
  iconVerticalCss,
  kidsMainBase,
  topContainer,
} from './styles';
import ProfileStatus from './ui/ProfileStatus/ProfileStatus';
import { IconTypo } from '@/shared/ui/IconTypo';
import CurrentBloodSugar from './ui/CurrentBloodSugar/CurrentBloodSugar';

const KidsMainPage = () => {
  return (
    <div css={kidsMainBase}>
      {/* 상단 컴포넌트들 */}
      <div css={topContainer}>
        {/* 프로필 상태창 */}
        <ProfileStatus />
        {/* 아이콘 모음 */}
        <div css={iconGroupCss}>
          <div css={iconHorizontalCss}>
            <IconTypo
              icon="/img/%EB%A7%90%EB%9E%911.png"
              fontSize="0.75"
              menu={
                <span>
                  오늘의 <br />
                  퀘스트
                </span>
              }
            />
          </div>
          <div css={iconVerticalCss}>
            <IconTypo
              icon="/img/%EB%A7%90%EB%9E%911.png"
              fontSize="0.75"
              menu="알림"
            />
            <IconTypo
              icon="/img/%EB%A7%90%EB%9E%911.png"
              fontSize="0.75"
              menu={
                <div>
                  도전
                  <br />
                  퀘스트
                </div>
              }
            />
            <CurrentBloodSugar />
          </div>
        </div>
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
