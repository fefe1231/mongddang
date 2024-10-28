import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const iconCss = css`
  width: 40px;
  height: 40px;
  margin-bottom: 8px; // 이미지와 텍스트 사이 간격
`;

export const menuCss = (selected: boolean) => css`
  color: ${selected ? '#3498db' : '#333'}; // 선택된 경우 색상 변경
  font-weight: ${selected ? 'bold' : 'normal'};
`;