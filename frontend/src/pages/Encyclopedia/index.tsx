/** @jsxImportSource @emotion/react */
import { TopBar } from '@/shared/ui/TopBar';
import space from '../../assets/img/space.png';
import { Owncharacter } from './ui/characterlist/owncharacter';
import { Notowncharacter } from './ui/characterlist/notown-character';
import { Newcharacter } from './ui/characterlist/new-character';
import { Description } from './description';
import { base, cardContainerCss, containerCss, imgCss } from './styles';
import { OwnModal } from './ui/modal/own-modal';
import { MainModal } from './ui/modal/main-modal';
import { Notmodal } from './ui/modal/Not-modal';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCharacterInfo } from './api';

export const Encyclopedia = () => {
  const [isOwnModal, setIsOwnModal] = useState(false);
  const [isMainModal, setIsMianModal] = useState(false);
  const [isNotModal, setIsNotModal] = useState(false);
  const CharacterQuery = useQuery({
    queryKey: ['character'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken') || ''; // 로컬 스토리지에서 accessToken 가져오기
      return await getCharacterInfo(accessToken);
    },
  });
  console.log(CharacterQuery);

  return (
    <div css={base}>
      {isOwnModal ? <OwnModal setstate={setIsOwnModal} /> : undefined}
      {isMainModal ? <MainModal setstate={setIsMianModal} /> : undefined}
      {isNotModal ? <Notmodal setstate={setIsNotModal} /> : undefined}
      <TopBar type="iconpage">캐릭터 도감</TopBar>
      <div css={containerCss}>
        <Description>
          <div>
            지금까지 모은 별가루로 <br /> 캐릭터를 모을 수 있어
          </div>
        </Description>
      </div>
      <img css={imgCss} src={space} alt="배경 이미지" />
      <div css={cardContainerCss}>
        <div css={containerCss} onClick={() => setIsOwnModal(true)}>
          <Owncharacter />
        </div>
        <div css={containerCss} onClick={() => setIsMianModal(true)}>
          <Newcharacter />
        </div>
        <div css={containerCss} onClick={() => setIsNotModal(true)}>
          <Notowncharacter />
        </div>
        <div css={containerCss}>
          <Notowncharacter />
        </div>
        <div css={containerCss}>
          <Notowncharacter />
        </div>
        <div css={containerCss}>
          <Notowncharacter />
        </div>
        <div css={containerCss}>
          <Notowncharacter />
        </div>
        <div css={containerCss}>
          <Notowncharacter />
        </div>
        <div css={containerCss}>
          <Notowncharacter />
        </div>
        <div css={containerCss}>
          <Notowncharacter />
        </div>
        <div css={containerCss}>
          <Notowncharacter />
        </div>
        <div css={containerCss}>
          <Notowncharacter />
        </div>
      </div>
    </div>
  );
};
