import { css } from '@emotion/react';

export const mealContainer = css`
  flex-direction: column;
`;

export const mealItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10rem;
  gap: 1.5rem;
  border-bottom: 2px solid red;
`;

export const imgBox = css`
  position: relative;
  display: flex;
  width: 10rem;
  height: 85%;
  object-fit: cover;
  margin: 0.5rem 0 0.5rem 0;
  border: 1px solid;
`;

export const mealImg = css`
  width: 100%;
  height: 100%;
  border: 2px solid;
`;

export const mealImgCover = css`
  position: absolute;
  background: rgb(0 0 0);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;

  display: flex;
  padding: 0 1rem 0 1rem;
  justify-content: center;
  align-items: center;
`;

export const visibleCover = css`
  opacity: 0.8;
`;

export const mealTextBox = css`
  flex-grow: 1;
`;
