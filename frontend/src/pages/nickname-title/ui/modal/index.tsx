/** @jsxImportSource @emotion/react */
import { Notification } from '@/shared/ui/Notification';
import { Typography } from '@/shared/ui/Typography';
import { css } from '@emotion/react';

interface ModalProps {
  bluehandler: () => void;
  redhandler: () => void;
}

const containerCss = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const UpdateCharacter = ({ bluehandler, redhandler }: ModalProps) => {
  return (
    <div css={containerCss}>
      <Notification
        redHandler={redhandler}
        bluehandler={bluehandler}
        ment={
          <div>
            <Typography color="dark" size="1" weight={600}>
              이 칭호를 대표로 설정할거야?
            </Typography>
            <Typography color="dark" size="0.75" weight={500}>
              *대표로 설정하면 메인에서 볼 수 있어
            </Typography>
          </div>
        }
        width={18}
        twoBtn
        children={['아니', '좋아']}
        type="confirm"
      />
    </div>
  );
};
