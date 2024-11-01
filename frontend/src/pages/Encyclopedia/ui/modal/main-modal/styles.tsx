import { css } from "@emotion/react";

export const base = css`
  display: flex;
  flex-direction: column; /* 세로 방향으로 나열 */
  text-align: center;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  position: relative; /* 자식 요소의 절대 위치를 기준으로 설정 */
`

export const modalCss = css`
  border: 5px solid #8FDCFF;
  position: relative; /* 자식 요소의 절대 위치를 기준으로 설정 */
`

export const xiconCss = css`
  position: absolute; /* 절대 위치 설정 */
  top: 1rem; /* 상단 여백 */
  right: 1rem; /* 오른쪽 여백 */
`
