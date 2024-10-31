/** @jsxImportSource @emotion/react */
import { TopBar } from '@/shared/ui/TopBar';
import React from 'react';
import space from '../../assets/img/space.png';
import { Owncharacter } from './ui/characterlist/owncharacter';
import { Notowncharacter } from './ui/characterlist/notown-character';
import { Newcharacter } from './ui/characterlist/new-character';
import { Description } from './description';
import { base, cardContainerCss, containerCss, imgCss } from './styles';

export const Encyclopedia = () => {
  return (
    <div css={base}>
      <TopBar type="iconpage">캐릭터 도감</TopBar>
      <div css={containerCss}>
        <Description />
      </div>
      <img css={imgCss} src={space} alt="배경 이미지" />
      <div css={cardContainerCss}>
        <div css={containerCss}>
          <Owncharacter />
        </div>
        <div css={containerCss}>
          <Newcharacter />
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
        <div css={containerCss}>
          <Notowncharacter />
        </div>
      </div>
    </div>
  );
};
