/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '@/shared/ui/TopBar';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import {
  containerCss,
  nextbtnCss,
  buttonGroupCss,
  mainContentCss,
} from './styles';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [role, setRole] = useState<'S' | 'P' | undefined>(undefined);
  const nav = useNavigate()
  return (
    <div css={mainContentCss}>
      <TopBar
        type="iconpage"
        iconHandler={() => {
          console.log('뒤로가기 버튼');
        }}
      >
        회원가입
      </TopBar>
      <div css={containerCss}>
        <Typography color="dark" size="1.25" weight={700}>
          사용하는 사람의 역할은 무엇인가요?
        </Typography>
        <div css={buttonGroupCss}>
          <Button
            color={'light'}
            fontSize="1"
            variant={role === 'S' ? 'contained' : 'outlined'}
            handler={() => setRole('S')}
          >
            어린이
          </Button>
          <Button
            color={'light'}
            fontSize="1"
            variant={role === 'P' ? 'contained' : 'outlined'}
            handler={() => setRole('P')}
          >
            보호자
          </Button>
        </div>
      </div>
      <div css={nextbtnCss}>
        <Button
          disabled={role ? false : true}
          color={'light'}
          fontSize="1"
          variant={'contained'}
          handler={()=>nav('/signup2')}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};
