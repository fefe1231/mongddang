import { css } from "@emotion/react";

export const containerCss = css`
  position: fixed;
  top: 55px; /* 화면 상단에 위치 */
  left: 65%; /* 수평 중앙 정렬 */
  transform: translateX(-50%); /* 중앙 정렬을 위한 변환 */
  z-index: 1000;
  text-align: center;
  width: 100%; /* 자동 너비 */
  padding: 20px; /* 패딩 추가 */
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out; /* 애니메이션 효과 */
`;
