/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import {
  containerCss,
  nextbtnCss,
  buttonGroupCss,
  mainContentCss,
} from './styles';


interface UserDataFormProps {
  onSubmit: () => void;
}

export const RoleSelector = ({ onSubmit }: UserDataFormProps) => {
  const [role, setRole] = useState<'S' | 'P' | undefined>(undefined);
  return (
    <div css={mainContentCss}>
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
          handler={()=>onSubmit()}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};
