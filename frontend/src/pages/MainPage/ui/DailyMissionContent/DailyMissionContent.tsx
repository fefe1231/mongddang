/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import {
  chatCss,
  checkImgCss,
  container,
  guideCss,
  guideTextCss,
  lineCss,
  missionItemCss,
  missionListCss,
  missionNameCss,
  mongImgCss,
} from './DailyMissionContent.styles';
import { mainIcons } from '../../constants/iconsData';
import DailyMissionBtn from '../DailyMissionBtn/DailyMissionBtn';
import { useDailyMissionStore } from '../../model/useDailyMissionStore';

const DailyMissionContent = () => {
  const { missions } = useDailyMissionStore();
  return (
    <div css={container}>
      <div css={missionListCss}>
        {missions.map((mission, i) => {
          return (
            <>
              <div css={missionItemCss} key={`mission-${new Date()}-${i}`}>
                <div css={missionNameCss}>
                  <img src={mainIcons.mission} alt="star" css={checkImgCss} />
                  <Typography color="dark" size="0.75" weight={600}>
                    {mission.name}
                  </Typography>
                </div>
                <DailyMissionBtn
                  btnStatus={mission.status}
                  reward={mission.reward}
                />
              </div>
              <div css={lineCss}></div>
            </>
          );
        })}
      </div>
      <div css={guideCss}>
        <div css={guideTextCss}>
          <div css={chatCss}>
            <Typography color="dark" size="0.75" weight={600}>
              오늘의 미션을 성공하면 <br />
              별가루를 얻을 수 있어
            </Typography>
          </div>
        </div>
        <img
          src={mainIcons.exerciseMongddang}
          alt="exerciseMong"
          css={mongImgCss}
        />
      </div>
    </div>
  );
};

export default DailyMissionContent;
