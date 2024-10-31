import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  width: 80px;
  height: 120px;
  padding: 10px 11px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const newCss = css`
  position: absolute;
  top: 10%;
  right: 10%;
  z-index: 2;
`
