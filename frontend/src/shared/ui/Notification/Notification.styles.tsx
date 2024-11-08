import { css } from '@emotion/react';
import { Tnotification } from './Notification.types';
import ColorStyle from '../styles/ColorStyles_edit';

export const base = (type: Tnotification, width: number, height: number) => css`
  position: relative;
  width: ${width}rem;
  height: ${height}rem;
  padding: 1.5rem 0;
  border-radius: 1.25rem;
  background-color: #fff;

  ${type === 'alert' &&
  css`
    border: 5px solid ${ColorStyle['danger'].main};
  `}
  ${type === 'primary' &&
  css`
    border: 5px solid ${ColorStyle['primary'].main};
  `}
`;

export const btnCss = css`
  display: flex;
  justify-content: center; /* 가로 방향 가운데 정렬 */
  position: absolute;
  bottom: 1.5rem;
  left: 50%; /* 왼쪽으로 50% 이동 */
  transform: translateX(-50%); /* 가로 방향으로 50% 이동하여 가운데 정렬 */
`;

export const btnContainerCss = css`
  display: flex;
  justify-content: center;
  position: absolute;
  margin: 0 1.5rem;
  gap: 1rem;
  bottom: 1.5rem;
  left: 0;
  right: 0;
`;
