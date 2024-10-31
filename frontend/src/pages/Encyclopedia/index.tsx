/** @jsxImportSource @emotion/react */
import { TopBar } from '@/shared/ui/TopBar';
import React from 'react';
import space from '../../assets/img/space.png';
import { Owncharacter } from './characterList/owncharacter';
import { Notowncharacter } from './characterList/notown-character';
import { Newcharacter } from './characterList/new-character';
import { Description } from './description';

export const Encyclopedia = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {' '}
      {/* 전체 화면을 꽉 채우도록 설정 */}
      <TopBar type="iconpage">캐릭터 도감</TopBar>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Description />
      </div>
      <img
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute', // 화면에 배경으로 고정
          top: 0,
          left: 0,
          zIndex: -1, // 이미지가 뒤에 위치하게 설정
        }}
        src={space}
        alt="배경 이미지"
      />
      <div style={{ display: 'flex', gap: '0.4rem', margin: '0 0.35rem' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Owncharacter />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Notowncharacter />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Newcharacter />
        </div>
      </div>
    </div>
  );
};
