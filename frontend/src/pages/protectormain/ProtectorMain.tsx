/** @jsxImportSource @emotion/react */

import MenuBtnGroup from '@/features/MenuBtnGroup/ui/MenuBtnGroup';
import {
  bubbleBox,
  bubbleChat,
  childList,
  container,
  imgContainer,
  imgCss,
  menuBtnContainer,
  menuBtnGroup,
  menuContent,
} from './styles';
import { Dropdown } from '@/shared/ui/Dropdown';
import { useEffect, useState } from 'react';
import { Typography } from '@/shared/ui/Typography';
import { ConnectedUser, useUserStore } from '@/entities/user/model';
import { useSelectedChildStore } from '@/entities/selected-child/model/store';
import { useShallow } from 'zustand/shallow';
import { Toggle } from '@/shared/ui/Toggle';
import MenuMongddang from '@/assets/img/page/menu.png';
import { useAudioStore } from '@/shared/model/useAudioStore';
import { useMedicationAddStore } from '../medicationAdd/model/useMedicationAddStore';

const ProtectorMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const { connectedChild } = useUserStore(
    useShallow((state) => ({
      connectedChild: state.getUserInfo().user?.connected,
    }))
  );
  const { setSelectedChild, selectedChild } = useSelectedChildStore(
    useShallow((state) => ({
      setSelectedChild: state.setSelectedChild,
      selectedChild: state.selectedChild,
    }))
  );
  const setUserInfo = useMedicationAddStore((state) => state.setUserInfo);
  const audio = useAudioStore();

  useEffect(() => {
    if (!selectedChild && connectedChild) {
      setSelected(connectedChild[0].name);
      setSelectedChild(connectedChild[0]);
      setUserInfo(connectedChild[0].nickname);
    }
    if (selectedChild) {
      setSelected(selectedChild.name);
      setUserInfo(selectedChild.nickname);
    }
  }, [
    connectedChild,
    selectedChild,
    setSelected,
    setSelectedChild,
    setUserInfo,
  ]);

  const handleSelectedChild = (value: ConnectedUser) => {
    setSelectedChild(value);
    setUserInfo(value.nickname);
  };

  return (
    <div css={container}>
      <div css={menuContent}>
        {/* 어린이 목록 */}
        <div css={childList}>
          <div css={bubbleBox}>
            <Dropdown
              options={connectedChild ?? []}
              onSelect={(value) => {
                setSelected(value.name);
                handleSelectedChild(value);
              }}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              selectedValue={selected}
              buttonLabel={selected} // 버튼 라벨을 선택된 값으로 설정
              onOpen={() => setIsOpen(true)} // 드롭다운 열기 기능 추가
            />
            <div css={bubbleChat}>
              <Typography color="dark" size="1.25" weight={600}>
                어린이의 기록
              </Typography>
            </div>
          </div>
          <div>
            <Toggle size={4} onToggle={audio.bgm.toggleMute} />
          </div>
        </div>
        <div css={menuBtnContainer}>
          <div css={imgContainer}>
            <img src={MenuMongddang} alt="" css={imgCss} />
          </div>
          {/* 메뉴 버튼 모음 */}
          <div css={menuBtnGroup}>
            <MenuBtnGroup userRole={'protector'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectorMain;
