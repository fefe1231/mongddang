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
  imgCss,
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

  return (
    <div css={base}>
      {isOwnModal && <OwnModal setstate={setIsOwnModal} />}
      {isMainModal && <MainModal setstate={setIsMainModal} />}
      {isNotModal && <Notmodal setstate={setIsNotModal} />}

      <TopBar type="iconpage">캐릭터 도감</TopBar>
      <div css={containerCss}>
        <Description>
          <div>
            지금까지 모은 별가루로 <br /> 캐릭터를 모을 수 있어
          </div>
        </Description>

        {/* 카드들을 감싸는 새로운 컨테이너 */}
        <div css={cardsWrapperCss}>
          {CharacterQuery.data.data.data.map((data: ICharacterData) => (
            <div key={data.id} css={cardContainerCss}>
              {!data.isOwned ? (
                <div onClick={() => setIsNotModal(true)}>
                  <Notowncharacter data={data} />
                </div>
              ) : data.isOwned && data.isNew ? (
                <div onClick={() => setIsMainModal(true)}>
                  <Newcharacter data={data} />
                </div>
              ) : (
                <div onClick={() => setIsOwnModal(true)}>
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
