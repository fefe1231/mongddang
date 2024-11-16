import { css } from '@emotion/react';

export const container = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  border-radius: 0 0 1.5rem 1.5rem;
  overflow-y: auto;
`;

export const notificationListCss = css`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column-reverse;
`;

export const notificationItemCss = css`
  display: flex;
  width: 100%;
  background-color: #e1f5fe;
  border-radius: 10px;
  padding: 5%;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  touch-action: pan-x;

  & .deleting {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const noNotificationCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const imgCss = css`
  width: 10rem;
`;
