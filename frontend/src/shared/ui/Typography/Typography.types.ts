import { ColorScale, FontWeight, Palette } from "@/shared/model/globalStylesTyes";
import { ReactNode } from "react";


export interface TypographyProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  color?: Palette;
  scale?: ColorScale;
  size?: number;
  weight?: FontWeight;
}
