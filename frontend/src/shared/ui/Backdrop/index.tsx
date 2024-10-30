/** @jsxImportSource @emotion/react */ 
import React from 'react'; 
import { BackdropProps } from './Backdrop.types'; 
import { base } from './Backdrop.styles'; 

export const Backdrop = ({ 
  children, 
  opacity = 40, 
  blur = 20, 
  color = 'dark', 
  ...props 
}: BackdropProps) => { 
  return ( 
    <div css={base(opacity, blur, color)} {...props}> 
      {children} 
    </div> 
  ); 
};