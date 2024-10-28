import { Tsize } from "../Typography/Typography.types";

export interface IconTypoProps {
  icon: string; 
  menu: string;
  selected?: boolean;
  size?: number;
  fontSize?: Tsize;
}