/** @jsxImportSource @emotion/react */
import { Button } from '@/shared/ui/Button';
import { Progress } from '@/shared/ui/Progress';
import { Typography } from '@/shared/ui/Typography';
import { useState } from 'react';
import { base, containerCss, progressCss } from './styles';
import { UpdateCharacter } from '../modal';
import { ItitleData } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { getTitleAchievement } from '../../api';

interface TitleComponentProps {
  title: ItitleData;
}

export const TitleComponent = ({ title }: TitleComponentProps) => {
  const [isModal, setIsModal] = useState(false);
  
  const { mutate } = useMutation({
    mutationFn: async () => {
      const accessToken = localStorage.getItem('accessToken') || '';
      if (!accessToken) {
        throw new Error('AccessToken이 필요합니다.');
      }
      console.log('토큰', accessToken);
      return await getTitleAchievement(accessToken, title.titleId);
    },
    onSuccess: () => {
      alert('업적 달성 보상 수령에 성공하였습니다.');
    },
    onError: () => {
      alert('업적 달성에 실패했습니다.');
    },
  });

  return (
    <div css={base}>
      <div css={containerCss}>
        <div>
          <Typography color="dark" size="1" weight={700}>
            {title.titleName}
          </Typography>
          <Typography
            style={{ margin: '0.3rem 0 0' }}
            color="dark"
            scale="500"
            size="0.75"
            weight={600}
          >
            {title.description}
          </Typography>
        </div>
        <div>
          <Button
            color="primary"
            fontSize="1"
            variant="contained"
            handler={() => setIsModal(true)}
            disabled={title.count !== title.executionCount}
          >
            획득
          </Button>
        </div>
      </div>
      <div css={progressCss}>
        <Progress
          color="success"
          max={title.count}
          size="lg"
          value={title.executionCount}
          variant="rectangle"
        />
        <Typography color="dark" scale="500" size="0.75" weight={500}>
          {title.executionCount}/{title.count}
        </Typography>
      </div>
      {isModal && (
        <UpdateCharacter
          bluehandler={mutate}
          redhandler={() => setIsModal(false)}
        />
      )}
    </div>
  );
};
