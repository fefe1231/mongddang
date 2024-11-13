/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Modal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { HiOutlineX } from 'react-icons/hi';
import { Chip } from '@/shared/ui/Chip';
import { base, modalCss, xiconCss } from '../main-modal/styles';
import { useQueryClient } from '@tanstack/react-query';
import { ICharacterData } from '@/pages/Encyclopedia/model/types';
import { characterImages, formatId } from '@/pages/Encyclopedia/model/mongddang-img';

interface CharacterResponse {
  data: {
    data: ICharacterData[];
  };
}

interface OwnModalProps {
  setstate: (value: boolean) => void;
  setIsNew: (value: boolean) => void;
  characterId?: number;
  data: ICharacterData | null;
}

export const FindModal = ({ setstate, data }: OwnModalProps) => {
  const [isParentModalOpen, setIsParentModalOpen] = useState(true);
  const queryClient = useQueryClient();

  const closeAllModals = () => {
    queryClient.setQueryData<CharacterResponse>(['character'], (oldData) => {
      window.location.reload()
      if (!oldData) return oldData;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          data: oldData.data.data.map((character) => ({
            ...character,
            isNew: false,
          })),
        },
      };
    });

    setstate(false);
    setIsParentModalOpen(false);
  };

  // data가 null인 경우 렌더링하지 않음
  if (!data) return null;

  const imageKey = formatId(data.id);
  const imagePath = characterImages[imageKey];

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
              <img 
                alt={`${data.name} 캐릭터 이미지`} 
                src={imagePath} 
              />
            </Icon>
            <Typography color="dark" size="1" weight={600}>
              {data.name}을(를) 찾았습니다!
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
    </>
  );
};