/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import { closeBtnContainer, closeBtnCss } from './CloseBtn.styles';
import { useNavigate } from 'react-router-dom';

type Props = {};

const CloseBtn = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div css={closeBtnContainer}>
      <div
        css={closeBtnCss}
        onClick={() => {
          navigate('/');
        }}
      >
        <Typography color="light" size="1.25" weight={700}>
          닫기
        </Typography>
      </div>
    </div>
  );
};

export default CloseBtn;
