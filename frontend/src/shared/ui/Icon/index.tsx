/** @jsxImportSource @emotion/react */
import React from 'react';
import { IconProps } from './Icon.types';
import { base } from './Icon.styles';

export const Icon = ({
  children,
  size = 2,
  ...props
}: IconProps) => {
  return (
    <span css={base(size)} {...props}>
      {children}
    </span>
  );
};