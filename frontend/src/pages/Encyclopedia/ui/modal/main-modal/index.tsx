/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Modal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { base, modalCss, xiconCss } from './styles';
import { HiOutlineX } from 'react-icons/hi';
import { Chip } from '@/shared/ui/Chip';
import { UpdateCharacter } from '../update-character';

interface OwnModalProps {
  setstate: (value: boolean) => void;
}

export const MainModal = ({ setstate }: OwnModalProps) => {
  const [isModal, setIsModal] = useState(false);
  const [isParentModalOpen, setIsParentModalOpen] = useState(true);

  const clickEvent = () => {
    setIsParentModalOpen(false);
    setIsModal(true);
  };

  const closeParentModal = () => {
    setstate(false);
    setIsParentModalOpen(false);
  };

  const handleUpdateCharacterClose = () => {
    setIsModal(false);
    setIsParentModalOpen(true); // 메인 모달을 다시 열어줍니다
  };

  return (
    <>
      {isParentModalOpen && (
        <Modal height={40} width={70} css={modalCss}>
          <Icon size={2} css={xiconCss} onClick={closeParentModal}>
            <HiOutlineX />
          </Icon>
          <div css={base}>
            <Chip border={0.625} color="primary" fontSize={1} fontWeight={700}>
              몽땅
            </Chip>
            <Icon size={5}>
              <img alt="icon-1" src="/img/%EB%A7%90%EB%9E%912.png" />
            </Icon>
            <Typography color="dark" size="1" weight={600}>
              이모션 왕국 최애 몽땅
              <br />
              주변에 항상 하트가 떠다닌다.
            </Typography>
            <Button
              handler={clickEvent}
              color="primary"
              fontSize="1"
              variant="contained"
            >
              대장 설정
            </Button>
          </div>
        </Modal>
      )}

      {isModal && (
        <UpdateCharacter
          bluehandler={() => {}}
          redhandler={handleUpdateCharacterClose}
        />
      )}
    </>
  );
};