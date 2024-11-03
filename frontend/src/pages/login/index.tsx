/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from '@/shared/ui/Button';
import { base, btnCss, contentCss } from './styles';
import { Icon } from '@/shared/ui/Icon';
import { Typography } from '@/shared/ui/Typography';

const Login = () => {
  const handleLogin = () => {
    // 구글 로그인 화면으로 이동시키기
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI}
		&response_type=code
		&scope=email profile openid`;
  };

  return (
    <div css={base}>
      <div css={contentCss}>  {/* 새로운 div 추가 */}
        <div>
          <Icon size={14}>
            <img alt="icon-0" src="/img/logo.png" />
          </Icon>
          <Typography color="dark" size="1.25" weight={500}>
            몽땅과 함께하는 당뇨 관리!
          </Typography>
        </div>
        <Button css={btnCss} fontSize="1.5" color="primary" handler={handleLogin}>
          <Icon size={1.5}>
            <img src="/img/google-logo.svg" alt="" />
          </Icon>
          구글로 시작하기
        </Button>
      </div>
    </div>
  );
};
export default Login;
