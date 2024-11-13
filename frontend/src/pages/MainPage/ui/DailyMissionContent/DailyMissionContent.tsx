/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import {
  checkImgCss,
  container,
  missionItemCss,
  missionListCss,
} from './DailyMissionContent.styles';
import { mainIcons } from '../../constants/iconsData';
import DailyMissionBtn from '../DailyMissionBtn/DailyMissionBtn';

const DailyMissionContent = () => {
  return (
    <div css={container}>
      <div css={missionListCss}>
        <div css={missionItemCss}>
          <img src={mainIcons.mission} alt="star" css={checkImgCss} />
          <Typography color="dark" size="1" weight={600}>
            아침 먹기
          </Typography>
          <DailyMissionBtn />
        </div>
      </div>
    </div>
  );
};

export default DailyMissionContent;
