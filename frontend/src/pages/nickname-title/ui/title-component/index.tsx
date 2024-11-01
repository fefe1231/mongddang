/** @jsxImportSource @emotion/react */
import { Button } from '@/shared/ui/Button';
import { Progress } from '@/shared/ui/Progress';
import { Typography } from '@/shared/ui/Typography';
import React, { useState } from 'react';
import { base, containerCss, progressCss } from './styles';
import { UpdateCharacter } from '../modal';

export const TitleComponent = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <div css={base}>
      <div css={containerCss}>
        <div>
          <Typography color="dark" size="1" weight={700}>
            수면마스터
          </Typography>
          <Typography
            style={{ margin: '0.3rem 0 0' }}
            color="dark"
            scale="500"
            size="0.75"
            weight={600}
          >
            제 시간에 자기 10번 수행
          </Typography>
        </div>
        <div>
          <Button
            handler={() => {}}
            color="primary"
            fontSize="1"
            variant="contained"
            onClick={() => setIsModal(true)}
            // disabled
          >
            획득
          </Button>
        </div>
      </div>
      <div css={progressCss}>
        <Progress
          color="success"
          max={10}
          size="lg"
          value={10}
          variant="rectangle"
        />
        <Typography color="dark" scale="500" size="0.75" weight={500}>
          (10/10)
        </Typography>
      </div>
      {isModal && (
        <UpdateCharacter
          bluehandler={() => {}}
          redhandler={() => setIsModal(false)}
        />
      )}
    </div>
  );
};
