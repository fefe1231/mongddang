/** @jsxImportSource @emotion/react */
import { Button } from '@/shared/ui/Button';
import { Progress } from '@/shared/ui/Progress';
import { Typography } from '@/shared/ui/Typography';
import { useState, useEffect } from 'react';
import { base, containerCss, progressCss } from './styles';
import { UpdateCharacter } from '../modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTitleAchievement, getTitleMain } from '../../api/api';
import { ItitleData } from '../../model/types';
import AchievementToast from '../toast';

interface TitleComponentProps {
  title: ItitleData;
}

export const TitleComponent = ({ title }: TitleComponentProps) => {
  const [isModal, setIsModal] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const queryClient = useQueryClient();
  // const queryClient = new QueryClient();

  const { mutate: achievementMutate } = useMutation({
    mutationFn: async () => {
      const accessToken = localStorage.getItem('accessToken') || '';
      if (!accessToken) {
        throw new Error('AccessToken이 필요합니다.');
      }
      return await getTitleAchievement(accessToken, title.titleId);
    },
    onSuccess: () => {
      setIsModal(false);
      setIsToast(true); // 토스트 표시
      queryClient.invalidateQueries({ queryKey: ['titles'] });
    },
    onError: () => {
      alert('업적 달성에 실패했습니다.');
    },
  });

  const { mutate: mainMutate } = useMutation({
    mutationFn: async () => {
      const accessToken = localStorage.getItem('accessToken') || '';
      if (!accessToken) {
        throw new Error('AccessToken이 필요합니다.');
      }
      return await getTitleMain(accessToken, title.titleId);
    },
    onSuccess: () => {
      setIsModal(false);
      queryClient.invalidateQueries({ queryKey: ['titles'] });
    },
    onError: () => {
      alert('대표 달성에 실패했습니다.');
    },
  });

  const handleAchievementClick = () => {
    setIsUpdateModal(true);
  };

  // 토스트 상태를 일정 시간 후에 자동으로 숨기기
  useEffect(() => {
    if (isToast) {
      const timer = setTimeout(() => {
        setIsToast(false);
      }, 5000); // 5초 후에 사라짐

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }
  }, [isToast]);

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
          {title.isOwned && title.isMain ? (
            <Button
              color="primary"
              fontSize="1"
              variant="contained"
              handler={() => setIsModal(true)}
              disabled
            >
              대표
            </Button>
          ) : title.isOwned ? (
            <Button
              color="primary"
              fontSize="1"
              variant="contained"
              handler={() => setIsModal(true)}
              disabled={title.count !== title.executionCount}
            >
              대표설정
            </Button>
          ) : title.count !== title.executionCount ? (
            <Button
              color="primary"
              fontSize="1"
              variant="contained"
              handler={handleAchievementClick}
              disabled={title.count !== title.executionCount}
            >
              획득
            </Button>
          ) : (
            <Button
              color="primary"
              fontSize="1"
              variant="contained"
              handler={handleAchievementClick}
              disabled={title.count !== title.executionCount}
            >
              획득
            </Button>
          )}
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
          bluehandler={mainMutate}
          redhandler={() => setIsModal(false)}
        />
      )}
      {isUpdateModal && (
        <UpdateCharacter
          bluehandler={() => {
            achievementMutate();
            setIsUpdateModal(false);
          }}
          redhandler={() => setIsUpdateModal(false)}
        />
      )}
      {isToast && (
        <AchievementToast />
      )}
    </div>
  );
};
