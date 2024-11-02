import React from 'react';
import { Button } from '@/shared/ui/Button';

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
    <div>
      <Button handler={handleLogin}>구글로 시작하기</Button>
    </div>
  );
};
export default Login;
