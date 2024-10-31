/** @jsxImportSource @emotion/react */
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';
import { TopBar } from '@/shared/ui/TopBar';
import { Typography } from '@/shared/ui/Typography';
import React, { useState } from 'react';
import { textFieldCss } from './styles';

export const DataForm = () => {
  const [gender, setGender] = useState<'M' | 'F' | undefined>(undefined);
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
      <div style={{ margin: '2rem' }}>
        <Typography color="dark" size="1.25" weight={600}>
          회원가입을 위해
          <br />
          정보를 입력해주세요!
        </Typography>
        <div css={textFieldCss}>
          <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
            <TextField
              color="primary"
              defaultValue=""
              label="닉네임"
              placeholder=""
              type="text"
              variant="outlined"
              style={{ flexGrow: 1 }}
            />
            <Button
              color="primary"
              fontSize="1"
              variant="contained"
              handler={() => {}}
            >
              확인
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
            <TextField
              color="primary"
              defaultValue=""
              label="YYYY"
              placeholder=""
              type="number"
              variant="outlined"
            />
            <TextField
              color="primary"
              defaultValue=""
              label="MM"
              placeholder=""
              type="number"
              variant="outlined"
            />
            <TextField
              color="primary"
              defaultValue=""
              label="DD"
              placeholder=""
              type="number"
              variant="outlined"
            />
          </div>
          <div style={{ margin: '1rem 0' }}>
            <TextField
              color="primary"
              defaultValue=""
              label="이름"
              placeholder=""
              type="text"
              variant="outlined"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Button
              color={'light'}
              fontSize="1"
              variant={gender === 'M' ? 'contained' : 'outlined'}
              handler={() => setGender('M')}
            >
              남자
            </Button>
            <Button
              color={'light'}
              fontSize="1"
              variant={gender === 'F' ? 'contained' : 'outlined'}
              handler={() => setGender('F')}
            >
              여자
            </Button>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1rem',
          }}
        >
          <Button
            color="primary"
            fontSize="1"
            variant="contained"
            handler={() => {}}
          >
            가입하기
          </Button>
        </div>
      </div>
    </div>
  );
};
