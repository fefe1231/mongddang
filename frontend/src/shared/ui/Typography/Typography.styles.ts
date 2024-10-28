import { ColorScale, FontWeight, Palette } from '@/shared/model/globalStylesTyes';
import { css } from '@emotion/react';
import ColorStyle from '../styles/colorStyles';
import { Colors } from '../styles/globalStyles';

export const base = (
  color: Palette,
  size: number,
  weight: FontWeight,
  scale?: ColorScale,
) => css`
  color: ${!scale ? ColorStyle[color].main : Colors[color][scale]};
  font-size: ${size}rem;
  font-weight: ${weight};
`;
