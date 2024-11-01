import { css } from '@emotion/react';
import MainBackground from '@/assets/img/잔디.png';

export const kidsMainBase = css`
  display: flex;
  min-width: 360px;
  min-height: 640px;
  justify-content: center;
  background-color: #aedbff;
  background-image: url(${MainBackground});
  background-size: cover;
  background-position: bottom;
`;

export const topContainer = css`
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 3%;
`;

export const iconGroupCss = css`
  display: flex;
  padding: 3%;
  gap: 1rem;
`;

export const iconHorizontalCss = css`
  display: flex;
`;

export const iconVerticalCss = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
