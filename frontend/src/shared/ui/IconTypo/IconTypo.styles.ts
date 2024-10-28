import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const iconCss = (size:number) => css`
  width: ${size}rem;
  height: ${size}rem;
  margin-bottom: 0.5rem; // 이미지와 텍스트 사이 간격
`;

export const menuCss = (selected: boolean) => css`
  color: ${selected ? '#3498db' : '#333'};
  font-weight: ${selected ? 'bold' : 'normal'};
`;