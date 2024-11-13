/** @jsxImportSource @emotion/react */

import { Button } from '@/shared/ui/Button';
import { btnContent, btnCss, starCss } from './DailyMissionBtn.styles';
import { Typography } from '@/shared/ui/Typography';
import { mainIcons } from '../../constants/iconsData';

const DailyMissionBtn = () => {
  return (
    <Button
      color="light"
      fontSize="1"
      isShadow
      scale="100"
      variant="contained"
      handler={() => {}}
      css={btnCss}
    >
      <div css={btnContent}>
        <img src={mainIcons.star} alt="star" css={starCss} />
        <Typography color="dark" size="1" weight={600}>
          아침 먹기
        </Typography>
      </div>
    </Button>
  );
};

export default DailyMissionBtn;
