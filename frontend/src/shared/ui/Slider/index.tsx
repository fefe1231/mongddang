/** @jsxImportSource @emotion/react */

import { fillCss, remainingFillCss, sliderContainerCss, thumbCss } from './Slider.styles';
import { SliderProps } from './Sllider.types';


export const Slider = ({ max = 50, standard = 30, value = 30, ...props }: SliderProps) => {
  return (
    <div css={sliderContainerCss} {...props}>
      <div css={fillCss(standard, max)} />
      <div css={remainingFillCss(standard, max)} />
      <div css={thumbCss(value, standard, max)} />
    </div>
  );
};
