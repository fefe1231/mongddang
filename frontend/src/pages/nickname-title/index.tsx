/** @jsxImportSource @emotion/react */
import { TopBar } from '@/shared/ui/TopBar';
import space from '../../assets/img/space.png';
import { containerCss, imgCss } from '../Encyclopedia/styles';
// import { Description } from '../Encyclopedia/description';
import { Toggle } from '@/shared/ui/Toggle';
import { Typography } from '@/shared/ui/Typography';
import { TitleComponent } from './ui/title-component';
import { toggleContainerCss } from './styles';

export const NicknameTitle = () => {
  return (
    <div>
      <TopBar type="iconpage">칭호 도감</TopBar>
      <img css={imgCss} src={space} alt="배경 이미지" />
      <div css={containerCss}>
        {/* <Description /> */}
      </div>
      <div css={toggleContainerCss}>
        <Typography color="light" size="0.75" weight={700}>
          전체
        </Typography>
        <Toggle color="primary" size={2.5} />
      </div>
      <TitleComponent/>
    </div>
  );
};