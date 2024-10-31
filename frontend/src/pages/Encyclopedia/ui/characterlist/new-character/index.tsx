/** @jsxImportSource @emotion/react */
import React from 'react';
import { IconTypo } from '@/shared/ui/IconTypo';
import { containerCss, newCss } from './styles';
import { Typography } from '@/shared/ui/Typography';

export const Newcharacter = () => {
  return (
    <div css={containerCss}>
      <IconTypo
        fontSize="1"
        icon="/img/말랑2.png"
        menu="반짝몽땅"
        size={5}
      />
      <Typography
        color="primary"
        size="1"
        weight={600}
        css={newCss}
      >
        New!!
      </Typography>
    </div>
  );
};
