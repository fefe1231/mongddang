/** @jsxImportSource @emotion/react */

import { fillCss } from './Slider.styles';
import { SliderProps } from './Sllider.types';

export const Slider = ({ max, standard, ...props }: SliderProps) => {
  return (
    <div css={fillCss(standard, max)} {...props}>
      슬라이더 입니다.
    </div>
  );
};
