/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Modal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { HiOutlineX } from 'react-icons/hi';
import { Chip } from '@/shared/ui/Chip';
import { base, modalCss, xiconCss } from '../main-modal/styles';
import { useQueryClient } from '@tanstack/react-query';  // 추가

interface OwnModalProps {
  setstate: (value: boolean) => void;
  setIsNew: (value: boolean) => void;
  characterId?: number;  // 캐릭터 ID 추가 (필요한 경우)
}

export const FindModal = ({ setstate }: OwnModalProps) => {
  const [isParentModalOpen, setIsParentModalOpen] = useState(true);
  const queryClient = useQueryClient();  // queryClient 추가

  const closeAllModals = () => {
    // 캐시 업데이트
    queryClient.setQueryData(['character'], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          data: oldData.data.data.map((character: any) => ({
            ...character,
            // 여기서 필요한 데이터 업데이트
            // 예: isFound: character.id === characterId
          })),
        },
      };
    });

    setstate(false);
    setIsParentModalOpen(false);
    // setIsNew(true); // 이제 필요 없음
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
    </>
  );
};