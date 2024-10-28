/** @jsxImportSource @emotion/react */
import React from 'react';
import { ButtonProps } from './Button.types';
import { base, variantCss } from './Button.styles';
export const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  scale,
  disabled = false,
  fullwidth = false,
  isShadow = false,
  handler,
  ...props
}: ButtonProps) => {
  return (
    <button
      css={[
        base(color, fullwidth, scale, isShadow),  // isShadow 전달
        variantCss(variant, color, scale),
      ]}
      disabled={disabled}
      onClick={handler}
      {...props}
    >
      {children}
    </button>
  );
};