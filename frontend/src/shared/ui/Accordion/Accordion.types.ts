import { ReactNode } from "react";
import { Tsize } from "../Typography/Typography.types";
import { FontWeight } from "@/shared/model/globalStylesTyes";


export interface AccordionProps {
  icon: string;
  size: number;
  title: string;
  content: ReactNode;
  fontsize: Tsize;
  fontweight: FontWeight;
  onHandler: () => void;
}


