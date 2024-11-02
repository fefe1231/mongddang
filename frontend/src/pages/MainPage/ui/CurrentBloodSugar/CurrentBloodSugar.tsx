/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import { bloodSugarCss, container } from './CurrentBloodSugar.styles';

const CurrentBloodSugar = () => {
  return (
    <div css={container}>
      <div css={bloodSugarCss}>
        <Typography color="dark" size="1.5" weight={600}>
          50
        </Typography>
      </div>
      <Typography color="dark" size="0.75" weight={500}>
        내 혈당
      </Typography>
    </div>
  );
};

export default CurrentBloodSugar;
