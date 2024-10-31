/** @jsxImportSource @emotion/react */
import React from 'react';
import { IconTypo } from '@/shared/ui/IconTypo';
import { containerCss } from './styles';
import { Typography } from '@/shared/ui/Typography';

export const Newcharacter = () => {
  return (
    <div css={containerCss}>
      <IconTypo
        fontSize="1.25"
        icon="/img/말랑2.png"
        menu="메뉴"
        size={5}
      />
      <Typography
        color="primary"
        size="1"
        weight={600}
        style={{
          position: 'absolute',
          top: '10%', // 원하는 위치로 조정
          right: '10%', // 원하는 위치로 조정
          zIndex: '2',
        }}
      >
        New!!
      </Typography>
    </div>
  );
};
