/** @jsxImportSource @emotion/react */
import React from 'react';
import { Backdrop } from '../Backdrop';
import { ModalProps } from './modal.types';
import { base, modalContent } from './modal.styles';

export const Modal = ({ children, ...props }: ModalProps) => {
  return (
    <Backdrop
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div css={base} {...props}>
        <div css={modalContent}>{children}</div>
      </div>
    </Backdrop>
  );
};
