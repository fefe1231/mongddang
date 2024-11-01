/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';
import { Typography } from '@/shared/ui/Typography';
import { textFieldCss } from './styles';
import { handleDateChange } from '@/Utils/birthUtils';
import { validateNickname } from '@/Utils/validationUtils';

export const DataForm = () => {
  const [gender, setGender] = useState<'M' | 'F' | undefined>(undefined);
  const [birthYear, setBirthYear] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<string>('');
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleDateChange(value, 'year', setBirthYear);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleDateChange(value, 'month', setBirthMonth);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleDateChange(value, 'day', setBirthDay);
  };
  
  // 닉네임 유효성 검사
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (nickname.length > 10) {
      setNickname(nickname.slice(0, 10));
    }
    setNicknameError(validateNickname(e.target.value));
  };
  return (
    <div>
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
              value={nickname}
              onChange={handleNicknameChange}
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
              type="text"
              variant="outlined"
              value={birthYear}
              onChange={handleYearChange}
            />
            <TextField
              color="primary"
              defaultValue=""
              label="MM"
              placeholder=""
              type="text"
              variant="outlined"
              value={birthMonth}
              onChange={handleMonthChange}
            />
            <TextField
              color="primary"
              defaultValue=""
              label="DD"
              placeholder=""
              type="text"
              variant="outlined"
              value={birthDay}
              onChange={handleDayChange}
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
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
          >
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
