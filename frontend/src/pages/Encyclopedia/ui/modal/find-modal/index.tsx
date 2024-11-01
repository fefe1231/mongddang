/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Modal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { HiOutlineX } from 'react-icons/hi';
import { Chip } from '@/shared/ui/Chip';
import { UpdateCharacter } from '../update-character';
import { base, modalCss, xiconCss } from '../main-modal/styles';

interface OwnModalProps {
  setstate: (value: boolean) => void;
}

export const FindModal = ({ setstate }: OwnModalProps) => {
  const [isModal, setIsModal] = useState(false);
  const [isParentModalOpen, setIsParentModalOpen] = useState(true);

  const closeAllModals = () => {
    setstate(false); // 맨 처음 400 버튼 모달 닫기
    setIsParentModalOpen(false); // 현재 모달 닫기
  };

  return (
    <>
      {isParentModalOpen && (
        <Modal height={40} width={70} css={modalCss}>
          <Icon size={2} css={xiconCss} onClick={closeAllModals}>
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
              몰라요 몽땅을 찾았습니다!
            </Typography>
            <Button
              handler={closeAllModals}
              color="primary"
              fontSize="1"
              variant="contained"
            >
              안녕!
            </Button>
          </div>
        </Modal>
      )}

      {isModal && (
        <UpdateCharacter
          bluehandler={() => {}}
          redhandler={() => setIsModal(false)}
        />
      )}
    </>
  );
};