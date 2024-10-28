import { css } from '@emotion/react';

export const base = (size: number) => css`
  width: ${size}rem;
  height: ${size}rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain; // 이미지가 영역에 맞춰 조절되도록 설정
  }
`;
