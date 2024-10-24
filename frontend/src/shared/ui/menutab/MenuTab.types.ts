import { Palette, FontWeight } from "@/shared/model/globalstyle/globalStyleTypes";
import React, { ReactNode } from "react";
 


export interface MenuTabProps extends React.ComponentProps<'div'> {
  children: ReactNode[];
  color?: Palette;
  fontSize? : number;
  fontWeight? :FontWeight;
  onChangeMenu: (menu: number) => void;
}
