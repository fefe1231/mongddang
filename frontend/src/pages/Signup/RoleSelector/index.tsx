/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import {
  containerCss,
  nextbtnCss,
  buttonGroupCss,
  mainContentCss,
  btnCss,
} from './styles';
import { IconTypo } from '@/shared/ui/IconTypo';
import { Icon } from '@/shared/ui/Icon';

interface UserDataFormProps {
  onSubmit: () => void;
}

export const RoleSelector = ({ onSubmit }: UserDataFormProps) => {
  const [role, setRole] = useState<'S' | 'P' | undefined>(undefined);

  const ChildrenHander = () => {
    setRole('S');
  };

  return (
    <div css={mainContentCss}>
      <div css={containerCss}>
        <Typography color="dark" size="1.25" weight={700}>
          사용자를 선택해주세요!
        </Typography>
        <div css={buttonGroupCss}>
          <div css={btnCss(role, 'S')} onClick={() => setRole('S')}>
            <IconTypo
              fontSize="1.75"
              icon="/img/%EB%A7%90%EB%9E%911.png"
              menu="어린이"
              size={5}
            />
          </div>
          <div css={btnCss(role, 'P')} onClick={() => setRole('P')}>
            <IconTypo
              fontSize="1.75"
              icon="/img/%EB%A7%90%EB%9E%911.png"
              menu="보호자"
              size={5}
            />
          </div>
        </div>
      </div>
      <div css={nextbtnCss}>
        <Button
          disabled={role ? false : true}
          color={'light'}
          fontSize="1"
          variant={'contained'}
          handler={() => onSubmit()}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};
