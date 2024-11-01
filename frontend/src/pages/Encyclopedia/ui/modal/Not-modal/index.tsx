/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Modal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { HiOutlineX } from 'react-icons/hi';
import { Chip } from '@/shared/ui/Chip';
import { base, modalCss, xiconCss } from './styles';
import { BuyModal } from '../buy-modal';
import { FindModal } from '../find-modal';

interface OwnModalProps {
  setstate: (value: boolean) => void;
}

export const Notmodal = ({ setstate }: OwnModalProps) => {
  const [buyModal, setBuyModal] = useState<boolean>(false);
  const [findModal, setFindModal] = useState<boolean>(false);

  const handleBuyModalBlue = () => {
    setBuyModal(false);  // Close the buy modal
    setFindModal(true);  // Open the find modal
  };

  const handlefindModalBlue = () => {
    setBuyModal(false);  // Close the buy modal
    setFindModal(true);
    setstate(false)  // Open the find modal
  };


  return (
    <div>
      <Modal height={40} width={70} css={modalCss}>
        <Icon size={2} css={xiconCss} onClick={() => setstate(false)}>
          <HiOutlineX />
        </Icon>
        <div css={base}>
          <Chip border={0.625} color="primary" fontSize={1} fontWeight={700}>
            몽땅
          </Chip>
          <Icon size={5}>
            <img
              style={{ filter: 'grayscale(100%) brightness(0%' }}
              alt="icon-1"
              src="/img/말랑3.png"
            />
          </Icon>
          <Typography color="dark" size="1" weight={600}>
            이모션 왕국 최애 몽땅
            <br />
            주변에 항상 하트가 떠다닌다.
          </Typography>
          <Button
            handler={() => setBuyModal(true)}
            color="primary"
            fontSize="1"
            variant="contained"
          >
            400
          </Button>
        </div>
      </Modal>
      {buyModal && (
        <BuyModal
          bluehandler={handleBuyModalBlue}
          redhandler={() => setBuyModal(false)}
        />
      )}
      {findModal && (
        <FindModal setstate={handlefindModalBlue}/>
      )}
    </div>
  );
};