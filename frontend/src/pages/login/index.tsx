/** @jsxImportSource @emotion/react */
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { base, contentCss, googleCss } from './ui/styles';
import { Icon } from '@/shared/ui/Icon';
import { Typography } from '@/shared/ui/Typography';

interface IcredentialResponse {
  credential?: string;
  clientId?: string;
  select_by?: string;
}

const Login = () => {
  const nav = useNavigate();

  const handleLoginSuccess = (credentialResponse: IcredentialResponse) => {
    const idToken = credentialResponse.credential;
    console.log('ID Token:', idToken);

    // ID Token을 백엔드로 전송
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { idToken },
        {
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${idToken}`,
          },
        }
      )
      .then((response) => {
        const accessToken = response.data.body.accessToken;
        console.log('토큰 저장 성공:', accessToken);
        

        // accessToken을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);

        // accessToken을 axios 전역 헤더에 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // 회원 여부에 따른 페이지 이동
        if (response.data.body.isRegistered) {
          nav('/');
        } else {
          nav('/signup', { state: { idToken } });
        }
      })
      .catch((error) => {
        console.error('토큰 저장 실패:', error);
        console.log(idToken);
      });
  };

  const handleLoginError = () => {
    console.log('로그인 실패');
  };

  return (
    <div css={base}>
      <div css={contentCss}>
        <div>
          <Icon size={14}>
            <img alt="icon-0" src="/img/logo.png" />
          </Icon>
          <Typography
            style={{ textAlign: 'center' }}
            color="dark"
            size="1.25"
            weight={500}
          >
            몽땅과 함께하는
            <br />
            당뇨 관리!
          </Typography>
        </div>
        <div css={googleCss}>
          <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
        </div>
      </div>
    </div>
  );
};

export default Login;
