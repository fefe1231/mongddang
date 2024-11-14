/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import {
  checkImgCss,
  container,
  missionItemCss,
  missionListCss,
  missionNameCss,
} from './DailyMissionContent.styles';
import { mainIcons } from '../../constants/iconsData';
import DailyMissionBtn from '../DailyMissionBtn/DailyMissionBtn';

const DailyMissionContent = () => {
  return (
    <div css={container}>
      <div css={missionListCss}>
        <div css={missionItemCss}>
          <div css={missionNameCss}>
            <img src={mainIcons.mission} alt="star" css={checkImgCss} />
            <Typography color="dark" size="1" weight={600}>
              아침 먹기
            </Typography>
          </div>
          <DailyMissionBtn btnStatus={'already_rewarded'}/>
        </div>
      </div>
    </div>
  );
};

export default DailyMissionContent;
