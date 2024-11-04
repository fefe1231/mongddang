/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';
import { Typography } from '@/shared/ui/Typography';
import { textFieldCss } from './styles';
import { handleDateChange } from '@/Utils/birthUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserRole } from '..';
import { signUp } from '../api';
import { useMutation } from '@tanstack/react-query';
import { updateNickname } from '@/pages/profile/nickname-edit/api';
import { Palette } from '@/shared/model/globalStylesTyes';

export const DataForm = ({ role }: { role: UserRole }) => {
  const [gender, setGender] = useState<'male' | 'female' | undefined>(
    undefined
  );
  const [birthYear, setBirthYear] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<Palette>('primary');
  const [msg, setMsg] = useState<string>('');
  const nav = useNavigate();
  const location = useLocation();
  const idToken = location.state?.idToken;

  const handleDateChangeWrapper =
    (type: 'year' | 'month' | 'day') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleDateChange(
        e.target.value,
        type,
        type === 'year'
          ? setBirthYear
          : type === 'month'
            ? setBirthMonth
            : setBirthDay
      );
    };

  const getBirthString = () =>
    `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value.slice(0, 10); // 10자 제한
    setNickname(newNickname);
  };

  const signupHandler = async () => {
    if (
      !nickname ||
      !birthYear ||
      !birthMonth ||
      !birthDay ||
      !name ||
      !gender ||
      !role
    ) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const birth = getBirthString();
    try {
      const response = await signUp(
        idToken,
        role,
        birth,
        name,
        nickname,
        gender
      );
      if (response) {
        alert('회원가입이 완료되었습니다.');
        nav('/login'); // 또는 다음 페이지로 이동
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const { mutate } = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      setMsg('사용 가능한 닉네임입니다.');
      setColor('primary');
    },
    onError: () => {
      setMsg(
        nickname.length === 0
          ? '닉네임을 작성해주세요.'
          : '이미 사용 중인 닉네임입니다.'
      );
      setColor('danger');
    },
  });

  return (
    <div style={{ margin: '2rem' }}>
      <Typography color="dark" size="1.25" weight={600}>
        회원가입을 위해
        <br />
        정보를 입력해주세요!
      </Typography>
      <div css={textFieldCss}>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <TextField
            color="primary"
            label="닉네임"
            variant="outlined"
            value={nickname}
            onChange={handleNicknameChange}
            style={{ flexGrow: 1 }}
          />
          <Button
            color="primary"
            fontSize="1"
            variant="contained"
            handler={() => mutate(nickname)}
          >
            확인
          </Button>
        </div>
        {msg && (
          <Typography color={color} size="1" weight={500}>
            {msg}
          </Typography>
        )}
        <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
          <TextField
            color="primary"
            label="YYYY"
            variant="outlined"
            value={birthYear}
            onChange={handleDateChangeWrapper('year')}
          />
          <TextField
            color="primary"
            label="MM"
            variant="outlined"
            value={birthMonth}
            onChange={handleDateChangeWrapper('month')}
          />
          <TextField
            color="primary"
            label="DD"
            variant="outlined"
            value={birthDay}
            onChange={handleDateChangeWrapper('day')}
          />
        </div>
        <div style={{ margin: '1rem 0' }}>
          <TextField
            color="primary"
            label="이름"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Button
            color="light"
            fontSize="1"
            variant={gender === 'male' ? 'contained' : 'outlined'}
            handler={() => setGender('male')}
          >
            남자
          </Button>
          <Button
            color="light"
            fontSize="1"
            variant={gender === 'female' ? 'contained' : 'outlined'}
            handler={() => setGender('female')}
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
          handler={signupHandler}
        >
          가입하기
        </Button>
      </div>
    </div>
  );
};
