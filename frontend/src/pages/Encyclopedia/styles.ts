import { css } from '@emotion/react';

export const base = css`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: auto; // hidden에서 auto로 변경
`;

export const containerCss = css`
  position: relative;
  z-index: 1;
`;

export const imgCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed; // absolute에서 fixed로 변경하여 스크롤해도 배경이 따라다니게 함
  top: 0;
  left: 0;
  z-index: -1;
`;

export const cardContainerCss = css`
  display: flex;
  gap: 0.6rem;
  margin: 0 1rem;
  flex-wrap: wrap;
  padding-bottom: 2rem; // 하단 여백 추가
`;