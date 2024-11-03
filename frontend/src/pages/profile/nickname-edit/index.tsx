/** @jsxImportSource @emotion/react */
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';
import { TopBar } from '@/shared/ui/TopBar';
import React, { useState } from 'react';
import { containerCss, editCss } from './styles';
import { Typography } from '@/shared/ui/Typography';
import { updateNickname } from './api';
import { Palette } from '@/shared/model/globalStylesTyes';
import { useMutation } from '@tanstack/react-query';

export const NicknameEdit = () => {
  const [nickname, setNickname] = useState<string>('');
  const [color, setColor] = useState<Palette>('primary');
  const [msg, setMsg] = useState<string>('');

  const nicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const { mutate } = useMutation({
    mutationFn: async (nickname: string) => await updateNickname(nickname),
    onSuccess: () => {
      console.log('조회 성공');
      setMsg('사용 가능한 닉네임입니다.');
      setColor('primary');
    },
    onError: () => {
      console.log('로그인 실패');
      if (nickname.length === 0) {
        setMsg('닉네임을 작성해주세요.');
        setColor('danger');
      } else {
        setMsg('이미 사용 중인 닉네임입니다.');
        setColor('danger');
      }
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
            color={color}
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

        {msg && (
          <Typography color={color} size="1" weight={500}>
            {msg}
          </Typography>
        )}

        <Button
          style={{ margin: '1rem 0' }}
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
