import ColorStyle from '@/shared/ui/styles/ColorStyles_edit';
import { Colors } from '@/shared/ui/styles/globalStyles';
import { css } from '@emotion/react';

export const base = css`
  display: flex;
  align-items: center; // 수직 중앙 정렬
  justify-content: center; // 수평 중앙 정렬
  height: 100vh;
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
