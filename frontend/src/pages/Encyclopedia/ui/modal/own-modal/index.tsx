/** @jsxImportSource @emotion/react */
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Modal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { HiOutlineX } from 'react-icons/hi';
import { Chip } from '@/shared/ui/Chip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { base, modalCss, storyTypographyCss, xiconCss } from './styles';
import { useState } from 'react';
import { ICharacterData } from '@/pages/Encyclopedia/model/types';
import { getMainInfo } from '@/pages/Encyclopedia/api/api';
import { UpdateCharacter } from '../update-character';
import { characterImages, formatId } from '@/pages/Encyclopedia/model/mongddang-img';

interface OwnModalProps {
  setstate: (value: boolean) => void;
  data: ICharacterData | null;
}

interface CharacterResponse {
  data: {
    data: ICharacterData[];
  };
}

export const OwnModal = ({ setstate, data }: OwnModalProps) => {
  const queryClient = useQueryClient();
  const [isParentModalOpen, setIsParentModalOpen] = useState(true);
  const [isModal, setIsModal] = useState(false);
  
  const mainMutation = useMutation<AxiosResponse<ICharacterData>, Error, number>({
    mutationFn: (characterId: number) => getMainInfo(characterId),
    onSuccess: async (response, characterId) => {
      // 실제 데이터 구조 확인을 위한 로그
      console.log('API 응답 전체:', response);
      console.log('API 응답 데이터:', response.data);
      console.log('현재 캐시 데이터:', queryClient.getQueryData(['character']));
      
      try {
        // 응답 구조에 따라 캐시 업데이트 로직 수정
        queryClient.setQueryData<CharacterResponse>(['character'], (oldData) => {
          if (!oldData) {
            console.log('기존 캐시 데이터가 없음');
            return oldData;
          }
          
          // 데이터 구조 검증
          if (!oldData.data?.data) {
            console.log('캐시 데이터 구조가 예상과 다름:', oldData);
            return oldData;
          }
  
          const updatedData = {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((character) => ({
                ...character,
                isMain: character.id === characterId,
              })),
            },
          };
          
          console.log('업데이트될 데이터:', updatedData);
          return updatedData;
        });
  
        await queryClient.invalidateQueries({ queryKey: ['character'] });
        
        setIsParentModalOpen(false);
        setIsModal(false);
        setstate(false);
      } catch (error) {
        console.error('캐시 업데이트 실패의 원인:', error);
        // 에러 상황에서도 모달은 닫아줌
        setIsParentModalOpen(false);
        setIsModal(false);
        setstate(false);
      }
    },
    onError: (error) => {
      console.error('대장 설정 실패:', error);
      alert('대장 설정에 실패했습니다. 다시 시도해주세요.');
    },
  });
  
  const handleSetMain = () => {
    if (data?.id) {
      mainMutation.mutate(data.id);
    }
  };
  
  const handleUpdateCharacterClose = () => {
    setIsModal(false);
    setIsParentModalOpen(true);
  };
  
  const clickEvent = () => {
    setIsParentModalOpen(false);
    setIsModal(true);
  };
  
  if (!data) return null;
  
  const imageKey = formatId(data.id);
  const imagePath = characterImages[imageKey];
  
  return (
    <div>
      {isParentModalOpen && (
        <Modal height={40} width={70} css={modalCss}>
          <Icon size={2} css={xiconCss} onClick={() => setstate(false)}>
            <HiOutlineX />
          </Icon>
          <div css={base}>
            <Chip border={0.625} color="primary" fontSize={1} fontWeight={700}>
              {data?.name}
            </Chip>
            <Icon size={5}>
              <img alt="icon-1" src={imagePath} />
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
              handler={clickEvent}
              color="primary"
              disabled={data?.isMain}
              fontSize="1"
              variant="contained"
            >
              {data?.isMain ? '대장' : '대장 설정'}
            </Button>
          </div>
        </Modal>
      )}
      {isModal && (
        <UpdateCharacter
          bluehandler={handleSetMain}
          redhandler={handleUpdateCharacterClose}
        />
      )}
    </div>
  );
};