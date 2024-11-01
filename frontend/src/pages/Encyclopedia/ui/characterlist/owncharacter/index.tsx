/** @jsxImportSource @emotion/react */
import React from 'react';
import { IconTypo } from '@/shared/ui/IconTypo';
import { containerCss } from './styles';

export const Owncharacter = () => {
  return (
    <>
      <div css={containerCss}>
        <IconTypo
          fontSize="1"
          icon="/img/%EB%A7%90%EB%9E%911.png"
          menu="몽땅"
          size={5}
        />
      </div>
    </>
  );
};
