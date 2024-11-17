import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  min-width: 360px;
  height: 100vh;
  box-sizing: content-box;
`;

export const topbarCss = css`
  position: static;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 3%;
  gap: 0.5rem;
`;

export const addMedicineBtnCss = css`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const medicineListCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const medicineItemCss = css`
  display: flex;
  width: 100%;
  border-radius: 10px;
  padding: 3%;
  justify-content: space-between;
  background-color: #e1f5fe;
`;

export const medicineTextCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const medicineInfoCss = css`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

export const medicineImgCss = css`
  width: 8rem;
  height: 6rem;
  background-color: gray;
`;

export const alertItemCss = css`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

export const alertImgCss = css`
  width: 1.5rem;
`;
