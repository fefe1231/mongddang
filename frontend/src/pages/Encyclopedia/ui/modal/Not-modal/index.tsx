/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Modal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { HiOutlineX } from 'react-icons/hi';
import { Chip } from '@/shared/ui/Chip';
import { useMutation, useQuery } from '@tanstack/react-query';
import { base, modalCss, storyTypographyCss, xiconCss } from './styles';
import { ICharacterData } from '@/pages/Encyclopedia/model/types';
import { getCoinInfo, postRecruitment } from '@/pages/Encyclopedia/api/api';
import { BuyModal } from '../buy-modal';
import { FindModal } from '../find-modal';
import { formatId, noCharacterImages } from '@/pages/Encyclopedia/model/no-mongddang-img';

interface OwnModalProps {
  setstate: (value: boolean) => void;
  data: ICharacterData;
}

export const Notmodal = ({ setstate, data }: OwnModalProps) => {
  const [, setIsNew] = useState(false);
  const [buyModal, setBuyModal] = useState<boolean>(false);
  const [findModal, setFindModal] = useState<boolean>(false);
  const imageKey = formatId(data.id);
  const imagePath = noCharacterImages[imageKey];

  const characterMutation = useMutation({
    mutationFn: async () => {
      return await postRecruitment(data.id);
    },
    onSuccess: () => {
      setFindModal(true);
    },
    onError: (error) => {
      console.error('Error recruiting character:', error);
      alert('캐릭터 모집에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const CoinQuery = useQuery({
    queryKey: ['coin'],
    queryFn: async () => {
      return await getCoinInfo();
    },
  });

  const handleBuyModalBlue = () => {
    setBuyModal(false);
    characterMutation.mutate(); 
  };

  const handleFindModalClose = () => {
    setFindModal(false);
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
            {data.name}
          </Chip>
          <Icon size={5}>
            <img
              alt={`${data.name} 캐릭터 이미지`}
              src={imagePath}
            />
          </Icon>
          <Typography
            color="dark"
            size="1"
            weight={600}
            css={storyTypographyCss}
          >
            {data.story}
          </Typography>
          <Button
            handler={() => setBuyModal(true)}
            color="primary"
            fontSize="1"
            variant="contained"
          >
            {data.price}
          </Button>
          <Typography
            color="dark"
            size="1"
            weight={600}
            css={storyTypographyCss}
          >
            보유 코인 : {CoinQuery.data?.data.data.coin}
          </Typography>
        </div>
      </Modal>
      {buyModal && (
        <BuyModal
          bluehandler={handleBuyModalBlue}
          redhandler={() => setBuyModal(false)}
        />
      )}
      {findModal && (
        <FindModal 
          data={data}
          setstate={handleFindModalClose} 
          setIsNew={setIsNew}
        />
      )}
    </div>
  );
};