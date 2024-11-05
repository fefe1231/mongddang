/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Modal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { HiOutlineX } from 'react-icons/hi';
import { Chip } from '@/shared/ui/Chip';
import { BuyModal } from '../buy-modal';
import { FindModal } from '../find-modal';
import { base, modalCss, xiconCss, storyTypographyCss } from './styles';
import { ICharacterData } from '@/pages/Encyclopedia/types';

interface OwnModalProps {
  setstate: (value: boolean) => void;
  data: ICharacterData | null;
}

export const Notmodal = ({ setstate, data }: OwnModalProps) => {
  const [buyModal, setBuyModal] = useState<boolean>(false);
  const [findModal, setFindModal] = useState<boolean>(false);

  const handleBuyModalBlue = () => {
    setBuyModal(false);
    setFindModal(true);
  };

  const handlefindModalBlue = () => {
    setBuyModal(false);
    setFindModal(true);
    setstate(false);
  };

  return (
    <div>
      <Modal height={40} width={70} css={modalCss}>
        <Icon size={2} css={xiconCss} onClick={() => setstate(false)}>
          <HiOutlineX />
        </Icon>
        <div css={base}>
          <Chip border={0.625} color="primary" fontSize={1} fontWeight={700}>
            {data?.name}
          </Chip>
          <Icon size={5}>
            <img
              style={{ filter: 'grayscale(100%) brightness(0%' }}
              alt="icon-1"
              src="/img/말랑3.png"
            />
          </Icon>
          <Typography 
            color="dark" 
            size="1" 
            weight={600} 
            css={storyTypographyCss}
          >
            {data?.story}
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