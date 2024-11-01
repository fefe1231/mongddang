import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  width: 9rem;
  padding: 3%;
  gap: 3%;
  align-items: center;
  height: 12.5%;
  background-color: #fff;
  border: 5px solid #8fdcff;
  border-radius: 10px;
`;

export const nicknameCss = css`
  display: flex;
  width: 100%;
  padding: 3%;
  justify-content: center;
  font-weight: 500;
`;

export const coinContainer = css`
  position: relative;
  display: inline-flex;
  width: 100%;
  justify-content: center;
  padding: 3%;
`;

export const coinAmountCss = css`
  display: flex;
  width: 90%;
  background-color: #e1f5fe;
  border-radius: 10px;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 5% 8%;
`;

export const coinCss = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0%;
  z-index: 10;
`;
