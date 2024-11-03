import { SerializedStyles, css } from '@emotion/react';

import { ToastVariant } from './Toast.types';
import { Palette } from '@/shared/model/globalStylesTyes';
import ColorStyle from '../styles/ColorStyles';

const colors: Record<Palette, string> = {
  primary: '#F3E5F5',
  success: '#E3F2FD',
  danger: '#FFEBEE',
  secondary: '#EBEBEB',
  indigo: '#3F51B5',
  blue: '#2196F3',
  dark: '#F3E5F5',
  light: '#F3E5F5',
};

export const base = () => css`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  width: fit-content;
  max-width: calc(100% - 2rem);
  padding: 1rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  border-radius: 0.625rem;
`;

export const variants: Record<
  ToastVariant,
  (color: Palette) => SerializedStyles
> = {
  contained: (color: Palette) => css`
    background-color: ${colors[color]};
    font-size: 1rem;
    
  `,
  filled: (color: Palette) => css`
    background-color: ${ColorStyle[color].main};
    font-size: 1rem;
  `,
  outlined: (color: Palette) => css`
    background-color: white;
    border: 1px solid ${ColorStyle[color].main};
    font-size: 1rem;
  `,
};
