/** @jsxImportSource @emotion/react */
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';
import { TopBar } from '@/shared/ui/TopBar';
import React, { useState } from 'react';
import { containerCss, editCss } from './styles';
import { Typography } from '@/shared/ui/Typography';
import { updateNickname } from './api';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export const NicknameEdit = () => {
  const [nickname, setNickname] = useState<string>('');
  const nav = useNavigate();

  const nicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const { mutate } = useMutation({
    mutationFn: async (nickname: string) => await updateNickname(nickname),
    onSuccess: () => {
      console.log('조회 성공');
      nav('/');
    },
    onError: () => {
      alert('오류가 발생하였습니다.');
      console.log(Error);
    },
  });
  return (
    <div>
      <TopBar type="iconpage">닉네임 수정</TopBar>
      <div css={containerCss}>
        <Typography color="dark" size="1" weight={700}>
          현재 닉네임 :
        </Typography>
        <div css={editCss}>
          <TextField
            style={{ flex: '1' }}
            color="primary"
            label="닉네임"
            type="text"
            variant="outlined"
            value={nickname}
            onChange={nicknameChange}
          />
          <Button
            handler={() => mutate(nickname)}
            color="primary"
            fontSize="1"
            variant="contained"
          >
            확인
          </Button>
        </div>
        <Typography color="danger" size="1" weight={500}>
          닉네임 작성해주세요.
        </Typography>
        <Typography color="danger" size="1" weight={500}>
          이미 사용 중인 닉네임입니다.
        </Typography>
        <Typography color="danger" size="1" weight={500}>
          기존이랑 같은 닉네임입니다.
        </Typography>
        <Typography color="primary" size="1" weight={500}>
          사용가능한 닉네임입니다.
        </Typography>
        <Button
          handler={() => {}}
          color="primary"
          fontSize="1"
          fullwidth
          variant="contained"
        >
          변경하기
        </Button>
      </div>
    </div>
  );
};
