import React from 'react';
import { TopBar } from '@/shared/ui/TopBar';
import { Typography } from '@/shared/ui/Typography';

export const Signup = () => {
  return (
    <div>
      <TopBar
        type="iconpage"
        iconHandler={() => {
          console.log('뒤로가기 버튼');
        }}
      >
        회원가입
      </TopBar>
      <Typography color="dark" size="1" weight={500}>
        어떤 분이 사용하시나요?
      </Typography>
    </div>
  );
};
