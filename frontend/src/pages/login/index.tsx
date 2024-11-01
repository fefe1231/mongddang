/** @jsxImportSource @emotion/react */
import GOOGLE_OAUTH_URL from '@/constants/googleOAuthParams';
import { Button } from '@/shared/ui/Button';
import { TopBar } from '@/shared/ui/TopBar';
import React, { useState } from 'react';

export const Login = () => {
  const handleLogin = () => {
    window.location.href = GOOGLE_OAUTH_URL;
  };

  return (
    <div>
      <div>
        <Button
          handler={handleLogin}
          color="primary"
          fontSize="1"
          fullwidth
          variant="contained"
        >
          구글로 시작하기
        </Button>
      </div>
    </div>
  );
};
