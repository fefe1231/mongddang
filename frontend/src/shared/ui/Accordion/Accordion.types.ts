import { ReactNode } from 'react';
import { Tsize } from '../Typography/Typography.types';
import { FontWeight } from '@/shared/model/globalStylesTyes';

export interface AccordionProps {
  icon: string;
  size: number;
  title: string;
  content: ReactNode;
  titleSize: Tsize;
  titleWeight: FontWeight;
  contentSize: Tsize;
  contentWeight: FontWeight;
  onHandler: () => void;
}
