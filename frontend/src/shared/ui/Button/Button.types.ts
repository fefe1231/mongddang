import { ColorScale, Palette } from '@/shared/model/globalStylesTyes';
import { ReactNode } from 'react';

export type ButtonVariant = 'contained' | 'outlined';

export interface ButtonProps extends React.ComponentProps<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  color?: Palette;
  scale?: ColorScale;
  disabled?: boolean;
  fullwidth?: boolean;
  rounded?: number;
   handler: () => void;
}
