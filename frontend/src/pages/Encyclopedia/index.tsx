/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TopBar } from '@/shared/ui/TopBar';
import space from '../../assets/img/space.png';
import { Owncharacter } from './ui/characterlist/owncharacter';
import { Description } from './description';
import { 
  base, 
  cardContainerCss, 
  containerCss, 
  cardsWrapperCss, 
  imgCss 
} from './styles';
import { OwnModal } from './ui/modal/own-modal';
import { MainModal } from './ui/modal/main-modal';
import { Notmodal } from './ui/modal/Not-modal';
import { getCharacterInfo } from './api';
import { ICharacterData } from './types';
import { Notowncharacter } from './ui/characterlist/notown-character';
import { Newcharacter } from './ui/characterlist/new-character';

export const Encyclopedia = () => {
  const [isOwnModal, setIsOwnModal] = useState(false);
  const [isMainModal, setIsMainModal] = useState(false);
  const [isNotModal, setIsNotModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacterData | null>(null); // 선택된 캐릭터 데이터 상태

  const CharacterQuery = useQuery({
    queryKey: ['character'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken') || '';
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

  // 모달 열기 함수 (선택된 캐릭터 데이터를 설정하고 모달을 열음)
  const openModal = (character: ICharacterData, modalType: 'own' | 'main' | 'not') => {
    setSelectedCharacter(character); // 선택한 캐릭터 설정

    if (modalType === 'own') {
      setIsOwnModal(true);
    } else if (modalType === 'main') {
      setIsMainModal(true);
    } else if (modalType === 'not') {
      setIsNotModal(true);
    }
  };

  return (
    <div css={base}>
      {/* 각 모달에 선택된 캐릭터 데이터를 전달 */}
      {isOwnModal && <OwnModal data={selectedCharacter} setstate={setIsOwnModal} />}
      {isMainModal && <MainModal data={selectedCharacter} setstate={setIsMainModal} />}
      {isNotModal && <Notmodal data={selectedCharacter} setstate={setIsNotModal} />}

      <TopBar type="iconpage">캐릭터 도감</TopBar>
      <div css={containerCss}>
        <Description>
          <div>
            지금까지 모은 별가루로 <br /> 내 친구들을 찾을 수 있어!
          </div>
        </Description>

        {/* 카드들을 감싸는 새로운 컨테이너 */}
        <div css={cardsWrapperCss}>
          {CharacterQuery.data.data.data.map((data: ICharacterData) => (
            <div key={data.id} css={cardContainerCss}>
              {!data.isOwned ? (
                <div onClick={() => openModal(data, 'not')} >
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
