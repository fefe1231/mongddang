/** @jsxImportSource @emotion/react */

import { BottomBar } from '@/shared/ui/BottomBar';
import {
  bottomContainer,
  CharacterContainer,
  iconGroupCss,
  iconHorizontalCss,
  iconVerticalCss,
  kidsMainBase,
  kidsMainContent,
  mainCharacterCss,
  routineGroupCss,
  topContainer,
} from './styles';
import ProfileStatus from './ui/ProfileStatus/ProfileStatus';
import { IconTypo } from '@/shared/ui/IconTypo';
import { Icon } from '@/shared/ui/Icon';
import CurrentBloodSugar from './ui/CurrentBloodSugar/CurrentBloodSugar';
import MainCharacter from '@/assets/img/말랑1.png';
import ChatBubble from './ui/ChatBubble/ChatBubble';
import { useState } from 'react';
import DietModal from './ui/DietModal/DietModal';
import MailBox from './ui/MailBox/MailBox';

const KidsMainPage = () => {
  const [openDietModal, setOpenDietModal] = useState(false);
  const [openMailBox, setOpenMailBox] = useState(false);
  const closeDietModal = () => {
    setOpenDietModal(false);
  };
  const closeMailBox = () => {
    setOpenMailBox(false);
  };

  return (
    <div css={kidsMainBase}>
      <div css={kidsMainContent}>
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
              <div
                onClick={() => {
                  setOpenMailBox(true);
                }}
              >
                <IconTypo
                  icon="/img/%EB%A7%90%EB%9E%911.png"
                  fontSize="0.75"
                  menu="알림"
                />
              </div>
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

        <div css={bottomContainer}>
          {/* 메인캐릭터 + 말풍선 */}
          <div css={CharacterContainer}>
            <ChatBubble />
            <img src={MainCharacter} alt="" css={mainCharacterCss} />
          </div>
          {/* 일상생활 버튼 4종 */}
          <div css={routineGroupCss}>
            <Icon
              size={2.5}
              onClick={() => {
                setOpenDietModal(true);
              }}
            >
              <img alt="icon-0" src="/img/%EB%A7%90%EB%9E%911.png" />
            </Icon>
            <Icon size={2.5}>
              <img alt="icon-1" src="/img/%EB%A7%90%EB%9E%912.png" />
            </Icon>
            <Icon size={2.5}>
              <img alt="icon-2" src="/img/%EB%A7%90%EB%9E%913.png" />
            </Icon>
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
      </div>

      {/* 식단 등록 모달 */}
      {openDietModal && <DietModal closeDietModal={closeDietModal} />}

      {/* 알림창 */}
      {openMailBox && <MailBox closeMailBox={closeMailBox} />}
    </div>
  );
};

export default KidsMainPage;
