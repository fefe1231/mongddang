/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import {
  coinAmountCss,
  coinContainer,
  coinCss,
  container,
  nicknameCss,
} from './ProfileStatus.styles';
import Coin from '@/assets/img/Coin.png';

const ProfileStatus = () => {
  return (
    <div css={container}>
      {/* 칭호 + 닉네임 */}
      <div css={nicknameCss}>
        <Typography color="blue" size="1" weight={600}>
          너 뭐 되는
        </Typography>
        &nbsp;
        <Typography color="dark" size="1" weight={600}>
          갱얼쥐
        </Typography>
      </div>

      {/* 총 별가루 */}
      <div css={coinContainer}>
        <img css={coinCss} src={Coin} alt="coin" />
        <div css={coinAmountCss}>
          <Typography color="dark" size="1" weight={600}>
            40
          </Typography>
          &nbsp;
          <Typography color="dark" size="0.75" weight={400}>
            points
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatus;
