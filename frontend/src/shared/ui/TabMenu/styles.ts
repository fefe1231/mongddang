import { css } from "@emotion/react";
import { Colors } from "../styles/globalStyles";

export const labelCss = (id:string, activeTab:string) => css`
  border: 0;
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 4px 0px 4px ${Colors['dark'][500]};
  background-color: ${activeTab === id ? Colors['primary']['400'] : '#eee'};
`;


export const contentCss = css`
  background-color: #fff;
  /* border: 1px solid black; */
  border-radius: 0 0.625rem;
  padding: 1rem;
`