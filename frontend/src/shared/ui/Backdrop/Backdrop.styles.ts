import { css } from '@emotion/react';
import ColorStyle from '../styles/colorStyles';
import { Palette } from '@/shared/model/globalStylesTyes';

export const base = (opacity: number, blur: number, color: Palette) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 50;
  background-color: ${ColorStyle[color].main};
  opacity: ${opacity / 100};
  backdrop-filter: blur(${blur / 10}px);
`;
