/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TopBar } from '@/shared/ui/TopBar';
import space from '../../assets/img/space.png';

import { Description } from './ui/description';

import { getCharacterInfo, getNewInfo } from './api/api';
import { ICharacterData } from './model/types';

import { AxiosResponse } from 'axios';
import { CharacterResponse } from '../nickname-title/model/types';
import {
  base,
  cardContainerCss,
  cardsWrapperCss,
  containerCss,
  imgCss,
} from './ui/styles';
import { OwnModal } from './ui/modal/own-modal';
import { MainModal } from './ui/modal/main-modal';
import { Notmodal } from './ui/modal/Not-modal';
import { Notowncharacter } from './ui/characterlist/notown-character';
import { Newcharacter } from './ui/characterlist/new-character';
import { Owncharacter } from './ui/characterlist/owncharacter';
import { useNavigate } from 'react-router-dom';

export const Encyclopedia = () => {
  const [isOwnModal, setIsOwnModal] = useState(false);
  const [isMainModal, setIsMainModal] = useState(false);
  const [isNotModal, setIsNotModal] = useState(false);
  const nav = useNavigate();
  const [selectedCharacter, setSelectedCharacter] =
    useState<ICharacterData | null>(null);

  const accessToken = localStorage.getItem('accessToken');
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse<string, number>, Error, number>({
    mutationFn: (characterId) => {
      if (!accessToken) {
        throw new Error('AccessToken이 필요합니다.');
      }
      return getNewInfo(accessToken, characterId);
    },
    onSuccess: (_, characterId) => {
      queryClient.setQueryData<CharacterResponse>(['character'], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: oldData.data.data.map((character) =>
              character.id === characterId
                ? { ...character, isNew: false }
                : character
            ),
          },
        };
      });
    },
    onError: (error) => {
      console.error('상태 변경 실패:', error);
      alert('상태 변경에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const CharacterQuery = useQuery<CharacterResponse>({
    queryKey: ['character'],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error('AccessToken이 필요합니다.');
      }
      return await getCharacterInfo(accessToken);
    },
  });

  if (CharacterQuery.isLoading) {
    return <div>로딩 중...</div>;
  }

  if (CharacterQuery.isError) {
    return <div>에러 발생: {CharacterQuery.error.message}</div>;
  }

  if (!CharacterQuery.data?.data) {
    return <div>데이터가 없습니다.</div>;
  }

  const openModal = (
    character: ICharacterData,
    modalType: 'own' | 'main' | 'not'
  ) => {
    setSelectedCharacter(character);
    if (modalType === 'own') {
      setIsOwnModal(true);
    } else if (modalType === 'main') {
      mutation.mutate(character.id);
      setIsMainModal(true);
    } else if (modalType === 'not') {
      setIsNotModal(true);
    }
  };

  return (
    <div css={base}>
      {isOwnModal && (
        <OwnModal data={selectedCharacter} setstate={setIsOwnModal} />
      )}
      {isMainModal && (
        <MainModal data={selectedCharacter} setstate={setIsMainModal} />
      )}
      {isNotModal && (
        <Notmodal data={selectedCharacter} setstate={setIsNotModal} />
      )}

      <TopBar type="iconpage" iconHandler={()=>nav('/')}>
        캐릭터 도감
      </TopBar>
      <div css={containerCss}>
        <Description>
          <div>
            지금까지 모은 별가루로 <br /> 내 친구들을 찾을 수 있어!
          </div>
        </Description>

        <div css={cardsWrapperCss}>
          {CharacterQuery.data.data.data.map((data: ICharacterData) => (
            <div key={data.id} css={cardContainerCss}>
              {!data.isOwned ? (
                <div onClick={() => openModal(data, 'not')}>
                  <Notowncharacter data={data} />
                </div>
              ) : data.isOwned && data.isNew ? (
                <div onClick={() => openModal(data, 'main')}>
                  <Newcharacter data={data} />
                </div>
              ) : (
                <div onClick={() => openModal(data, 'own')}>
                  <Owncharacter data={data} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <img css={imgCss} src={space} alt="배경 이미지" />
    </div>
  );
};
