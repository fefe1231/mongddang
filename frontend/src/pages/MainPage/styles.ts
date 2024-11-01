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
