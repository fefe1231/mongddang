import { css } from '@emotion/react';

export const base = (height: number, width: number) => css`
  position: relative;
  width: ${height}%;
  min-height: ${width}%;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
`;
export const backdropStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* 또는 absolute */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 색상 조정 */
`;
