import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  border-radius: 0 0 1.5rem 1.5rem;
  background-color: #e1f5fe;
`;

export const missionListCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3% 7%;
  align-items: center;
  /* flex-grow: 1; */
`;

export const missionItemCss = css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  /* background-color: wheat; */
`;

export const missionNameCss = css`
display: flex;
align-items: center;
gap: 1rem;

`
export const checkImgCss = css`
  height: 2rem;
`;
