/** @jsxImportSource @emotion/react */
import { Button } from '@/shared/ui/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Btn = () => {
  const nav = useNavigate();
  return (
    <div>
      <Button handler={()=>nav('/signup')} color="primary" fontSize="1" variant="contained">
        회원가입
      </Button>
      <Button handler={()=>nav('/encyclopedia')} color="primary" fontSize="1" variant="contained">
        도감
      </Button>
      <Button handler={()=>nav('/nickname/title')} color="primary" fontSize="1" variant="contained">
        칭호
      </Button>
    </div>
  );
};
