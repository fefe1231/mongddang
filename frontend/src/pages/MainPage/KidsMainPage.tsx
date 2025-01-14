/** @jsxImportSource @emotion/react */

import { App } from '@capacitor/app';
import { BottomBar } from '@/shared/ui/BottomBar';
import {
  bottomContainer,
  CharacterContainer,
  dotCss,
  iconGroupCss,
  iconHorizontalCss,
  iconVerticalCss,
  kidsMainBase,
  kidsMainContent,
  mainCharacterClickedCss,
  mainCharacterCss,
  mainCharacterMovingCss,
  topContainer,
} from './styles';
import ProfileStatus from './ui/ProfileStatus/ProfileStatus';
import { IconTypo } from '@/shared/ui/IconTypo';
import CurrentBloodSugar from './ui/CurrentBloodSugar/CurrentBloodSugar';
import ChatBubble from './ui/ChatBubble/ChatBubble';
import { useEffect, useState } from 'react';
import DietModal from './ui/DietModal/DietModal';
import BaseModal from './ui/BaseModal/BaseModal';
import { useNavigate } from 'react-router-dom';
import RoutineBtnGroup from './ui/RoutineBtnGroup/RoutineBtnGroup';
import {
  AskEndRoutineAlert,
  AskStartRoutineAlert,
  EndRoutineAlert,
  StartRoutineAlert,
} from './ui/Alerts/Alerts';
import { setRoutine } from './hooks/useRoutineStatus';
import { getInitialRoutine } from './api/routineApi';
import { useStopwatchStore } from './model/useStopwatchStore';
import {
  getStopwatch,
  setExitTime,
  setStopwatch,
} from './hooks/useStopwatchStatus';
import { mainIcons } from './constants/iconsData';
import Loading from '@/shared/ui/Loading';
import { characterImages, formatId } from '../Encyclopedia/model/mongddang-img';
import { registerPlugin } from '@capacitor/core';
import Microphone from './ui/Microphone/Microphone';
import dayjs from 'dayjs';
import { useMainInfoQuery, useRefreshMainInfo } from './model/useMainIfoQuery';

export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}

export interface ForegroundPlugin {
  startForeground(): Promise<{ message: string }>;
  stopForeground(): Promise<{ message: string }>;
}

export const Foreground = registerPlugin<ForegroundPlugin>('Foreground');

const KidsMainPage = () => {
  const navigate = useNavigate();
  const { data: mainInfo, isLoading } = useMainInfoQuery();
  const refreshMainInfo = useRefreshMainInfo();

  const [openDietModal, setOpenDietModal] = useState(false);
  const [openBaseModal, setOpenBaseModal] = useState(false);
  const [contentType, setContentType] = useState('');
  const [alertStatus, setAlertStatus] = useState('');
  const [alertBloodSugar, setAlertBloodSugar] = useState(0);
  const [currentRoutine, setCurrentRoutine] = useState('');
  const [isMongClicked, setIsMongClicked] = useState(false);

  // 초기 루틴 상태 조회
  useEffect(() => {
    const fetchRoutine = async () => {
      const routineValue = await getInitialRoutine();
      if (routineValue.data === undefined) {
        setCurrentRoutine('');
      } else {
        const { category } = routineValue.data;
        if (category === 'meal') {
          setCurrentRoutine('먹는 중');
        } else if (category === 'exercise') {
          setCurrentRoutine('운동 중');
        } else if (category === 'sleeping') {
          setCurrentRoutine('자는 중');
        } else {
          setCurrentRoutine('');
        }
        useStopwatchStore.getState().updateStopwatch();
      }

      console.log('초기 루틴 조회', routineValue);
    };

    const handleAppStateChange = () => {
      if (currentRoutine === '운동 중') {
        const latestTime = useStopwatchStore.getState().time;
        setStopwatch(latestTime);
        const exitTime = Date.now();
        setExitTime(exitTime);
      }
    };

    App.addListener('appStateChange', async ({ isActive }) => {
      if (!isActive) {
        handleAppStateChange();
        useStopwatchStore.getState().endStopwatch();
      } else {
        const latestPrevTime = await getStopwatch();
        if (latestPrevTime !== '0') {
          useStopwatchStore.getState().updateStopwatch();
        }
      }
    });

    fetchRoutine();

    return () => {
      App.removeAllListeners();
    };
  }, []);

  if (isLoading || !mainInfo) {
    return <Loading />;
  }

  const handleDietModal = () => {
    setOpenDietModal(true);
  };

  const closeDietModal = () => {
    setOpenDietModal(false);
  };

  const closeBaseModal = () => {
    refreshMainInfo();
    setOpenBaseModal(false);
  };

  // 일상 수행 상태 관리
  const changeRoutine = (currentRoutine: string) => {
    console.log('루틴 변경', currentRoutine);
    setCurrentRoutine(currentRoutine);
    setRoutine(currentRoutine);
  };

  // 알림창 상태 관리
  const handleAlert = (status: string) => {
    setAlertStatus(status);
    if (status === 'endRoutine') {
      refreshMainInfo();
    }
  };

  // 알림창 혈당 관리
  const handleBloodSugar = (bloodSugar: number) => {
    setAlertBloodSugar(bloodSugar);
  };

  // 몽땅 움직임
  const handleMong = () => {
    setIsMongClicked(!isMongClicked);
  };

  // 바텀바 url 이동
  const moveBottomBar = (menu: number | undefined) => {
    if (menu === 0) {
      navigate('/encyclopedia');
    } else if (menu === 1) {
      navigate('/menu');
    } else if (menu === 2) {
      navigate(`/record/${dayjs().format('YYYY-MM-DD')}`);
    }
  };

  console.log('알림창 상태', alertStatus);
  console.log('루틴 상태', currentRoutine);

  return (
    <div css={kidsMainBase}>
      <div css={kidsMainContent}>
        {/* 상단 컴포넌트들 */}
        <div css={topContainer}>
          {/* 프로필 상태창 */}
          <ProfileStatus
            nickname={mainInfo.nickname}
            mainTitleName={mainInfo.mainTitleName}
            coin={mainInfo.coin}
          />
          {/* 아이콘 모음 */}
          <div css={iconGroupCss}>
            <div css={iconHorizontalCss}>
              <div
                onClick={() => {
                  setOpenBaseModal(true);
                  setContentType('dailyMission');
                }}
                style={{
                  position: 'relative',
                }}
              >
                <img
                  src={mainIcons.redDot}
                  alt="dot"
                  css={dotCss}
                  style={{
                    display:
                      mainInfo.unclaimedMissionReward === false ? 'none' : '',
                  }}
                />
                <IconTypo
                  icon={mainIcons.mission}
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
                    setOpenBaseModal(true);
                    setContentType('notification');
                  }}
                  style={{
                    position: 'relative',
                  }}
                >
                  <img
                    src={mainIcons.redDot}
                    alt="dot"
                    css={dotCss}
                    style={{
                      display:
                        mainInfo.unreadNotification === false ? 'none' : '',
                    }}
                  />

                  <IconTypo
                    icon={mainIcons.notification}
                    fontSize="0.75"
                    menu="알림"
                  />
                </div>
                <div
                  onClick={() => {
                    navigate('/nickname/title');
                  }}
                  style={{
                    position: 'relative',
                  }}
                >
                  <img
                    src={mainIcons.redDot}
                    alt="dot"
                    css={dotCss}
                    style={{
                      display:
                        mainInfo.unclaimedAchivementReward === false
                          ? 'none'
                          : '',
                    }}
                  />
                  <IconTypo
                    icon={mainIcons.achievement}
                    fontSize="0.75"
                    menu={
                      <div>
                        도전
                        <br />
                        퀘스트
                      </div>
                    }
                  />
                </div>
                <CurrentBloodSugar nickname={mainInfo.nickname} />
                <Microphone>
                  <div
                    onClick={() => {
                      navigate('/nickname/title');
                    }}
                  ></div>
                </Microphone>
              </div>
            </div>
          </div>
        </div>

        <div css={bottomContainer}>
          {/* 메인캐릭터 + 말풍선 */}
          <div
            css={CharacterContainer}
            onClick={() => {
              handleMong();
            }}
          >
            <ChatBubble status={currentRoutine} />
            <img
              // src={
              //   currentRoutine === '먹는 중'
              //     ? characterImages[
              //         `${formatId(mainInfo.mainMongddangId)}_meal`
              //       ]
              //     : currentRoutine === '운동 중'
              //       ? characterImages[
              //           `${formatId(mainInfo.mainMongddangId)}_exercise`
              //         ]
              //       : currentRoutine === '자는 중'
              //         ? characterImages[
              //             `${formatId(mainInfo.mainMongddangId)}_sleep`
              //           ]
              //         : characterImages[formatId(mainInfo.mainMongddangId)]
              // }
              src={
                currentRoutine === '먹는 중'
                  ? characterImages[`01_meal`]
                  : currentRoutine === '운동 중'
                    ? characterImages[`01_exercise`]
                    : currentRoutine === '자는 중'
                      ? characterImages[`01_sleep`]
                      : characterImages[formatId(mainInfo.mainMongddangId)]
              }
              alt="mainMong"
              css={
                currentRoutine === '운동 중' && !isMongClicked
                  ? mainCharacterMovingCss
                  : currentRoutine !== '운동 중' && isMongClicked
                    ? mainCharacterClickedCss
                    : mainCharacterCss
              }
            />
          </div>

          {/* 일상생활 버튼 3종 */}
          <RoutineBtnGroup
            changeRoutine={changeRoutine}
            handleDietModal={handleDietModal}
            currentRoutine={currentRoutine}
            handleAlert={handleAlert}
          />

          {/* 바텀바 */}
          <BottomBar
            icons={[mainIcons.collection, mainIcons.menu, mainIcons.record]}
            menus={['몽땅 도감', '메뉴', '일일 기록']}
            onHandleChange={moveBottomBar}
          />
        </div>
      </div>

      {/* 식단 등록 모달 */}
      {openDietModal && (
        <DietModal
          closeDietModal={closeDietModal}
          changeRoutine={changeRoutine}
          handleAlert={handleAlert}
          handleBloodSugar={handleBloodSugar}
        />
      )}

      {/* 알림창 */}
      {openBaseModal && (
        <BaseModal contentType={contentType} closeBaseModal={closeBaseModal} />
      )}

      {
        // 루틴 시작 여부 질문 알림
        alertStatus === 'askStartRoutine' ? (
          <AskStartRoutineAlert
            currentRoutine={currentRoutine}
            handleAlert={handleAlert}
            changeRoutine={changeRoutine}
            handleBloodSugar={handleBloodSugar}
          />
        ) : alertStatus === 'startRoutine' ? (
          // 루틴 시작 혈당 알림
          <StartRoutineAlert
            currentRoutine={currentRoutine}
            bloodSugar={alertBloodSugar}
            handleAlert={handleAlert}
          />
        ) : alertStatus === 'askEndRoutine' ? (
          // 루틴 종료 여부 질문 알림
          <AskEndRoutineAlert
            currentRoutine={currentRoutine}
            handleAlert={handleAlert}
            changeRoutine={changeRoutine}
            handleBloodSugar={handleBloodSugar}
          />
        ) : alertStatus === 'endRoutine' ? (
          // 루틴 종료 혈당 알림
          <EndRoutineAlert
            currentRoutine={currentRoutine}
            bloodSugar={alertBloodSugar}
            handleAlert={handleAlert}
          />
        ) : (
          <></>
        )
      }
    </div>
  );
};

export default KidsMainPage;
