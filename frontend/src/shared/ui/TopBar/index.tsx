/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBarProps } from './TopBar.types';
import { base } from './TopBar.styles';
import { IoIosArrowBack, IoIosClose } from 'react-icons/io';
import { Icon } from '../Icon';

export const TopBar = ({
  children = '테스트',
  type = 'modal',
  ...props
}: TopBarProps) => {
  return (
    <div css={base()} {...props}>
      {type === 'page' && (
        <>
          <span>{children}</span>
        </>
      )}
      {type === 'iconpage' && (
        <>
          <IoIosArrowBack style={{ marginRight: '0.5rem' }} />
          <span>{children}</span>
        </>
      )}
      {type === 'modal' && (
        <>
          <span style={{ flexGrow: 1, textAlign: 'center' }}>{children}</span>
          <Icon size={2}>
            <IoIosClose />
          </Icon>
        </>
      )}
    </div>
  );
};
