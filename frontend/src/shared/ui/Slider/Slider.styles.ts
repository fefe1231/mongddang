import { css } from "@emotion/react";

export const fillCss = (standard: number, max: number) => css`
  width: ${standard < 0 ? 0 : Math.round((standard / max) * 100)}%;
  transition: all 200ms ease;
`;
