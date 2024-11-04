/** @jsxImportSource @emotion/react */
import { Button } from '@/shared/ui/Button';
import { Progress } from '@/shared/ui/Progress';
import { Typography } from '@/shared/ui/Typography';
import { useState } from 'react';
import { base, containerCss, progressCss } from './styles';
import { UpdateCharacter } from '../modal';
import { ItitleData } from '../../types';
interface TitleComponentProps {
  title: ItitleData;
}
export const TitleComponent = ({ title }: TitleComponentProps) => {
  const [isModal, setIsModal] = useState(false);
  console.log(title);
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
            handler={() => {}}
            color="primary"
            fontSize="1"
            variant="contained"
            onClick={() => setIsModal(true)}
            disabled={title.count !== title.executionCount} // disabled 속성을 boolean으로 설정
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
          bluehandler={() => {}}
          redhandler={() => setIsModal(false)}
        />
      )}
    </div>
  );
};
