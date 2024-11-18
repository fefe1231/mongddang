import ColorStyle from '@/shared/ui/styles/colorStyles';
import { Colors } from '@/shared/ui/styles/globalStyles';
import { css } from '@emotion/react';
import loginBackground from '@/assets/img/page/login/login.png';

export const base = css`
  display: flex;
  align-items: center; // 수직 중앙 정렬
  justify-content: center; // 수평 중앙 정렬
  height: 100vh;
  background: url(${loginBackground}) 0 -2rem no-repeat;
  /* background-color: ${Colors.primary[400]}; */
`;

export const contentCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rem;
`;

export const btnCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  color: #000;
  border: 0.3rem solid ${ColorStyle.primary.main};
`;

export const googleCss = css`
  font-family: 'Paperlogy';
  border: 0.25rem solid ${Colors['primary'][500]};
  border-radius: 0.625rem;
`;

export const btn = css`
  position: absolute;
  border: 0;
  background-color: transparent;
  bottom: 3rem;
  /* 부드러운 전환 효과를 위한 transition */
  transition:
    transform 0.1s,
    box-shadow 0.1s;

  /* 기본 상태에서 살짝 떠있는 효과 */
  transform: translateY(0);

  /* 클릭했을 때의 효과 */
  &:active {
    transform: translate(3px, 3px); /* 아래로 살짝 이동 */
  }
`;

export const btnImg = css`
  object-fit: cover;
  width: 15rem;
  height: 5rem;
`;

export const pocket = css`
  position: absolute;
  transform: translate(-5.7rem, 5.3rem);
`