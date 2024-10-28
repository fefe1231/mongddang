import { ColorScale, Palette } from '@/shared/model/globalStylesTyes';
import { ReactNode } from 'react';

export type ButtonVariant = 'contained' | 'outlined';

export interface ButtonProps extends React.ComponentProps<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  color?: Palette;
  scale?: ColorScale;
  disabled?: boolean;
  isShadow?:boolean;
  fullwidth?: boolean;
  handler: () => void;
}

// 비활성화는 회색으로 고정
// 눌렀을 때 애니메이션 안으로 눌리는 듯이
//테두리 10으로 고정
// 화이트 테두리는 연한 회색 -> 그림자 없을 때만 
// 그림자 있고 없고 버전?
