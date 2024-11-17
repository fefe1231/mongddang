/** @jsxImportSource @emotion/react */

import { TextField } from '@/shared/ui/TextField';
import { Typography } from '@/shared/ui/Typography';
import {
  amountCss,
  amountGroup,
  amountNumCss,
  timeFieldCss,
} from './MedicationTime.styles';

const MedicationTime = () => {
  return (
    <div css={amountGroup}>
      <div css={amountCss}>
        <Typography color="dark" size="1" weight={600}>
          약 시간
        </Typography>
        <Typography color="dark" size="1.25" weight={600}>
          +
        </Typography>
      </div>
      <div css={amountNumCss}>
        <TextField
          color="primary"
          defaultValue=""
          label=""
          placeholder="HH"
          type="text"
          variant="standard"
          css={timeFieldCss}
        />
        <Typography color="dark" size="1" weight={500}>
          시
        </Typography>
        <TextField
          color="primary"
          defaultValue=""
          label=""
          placeholder="MM"
          type="text"
          variant="standard"
          css={timeFieldCss}
        />
        <Typography color="dark" size="1" weight={500}>
          분
        </Typography>
      </div>
    </div>
  );
};

export default MedicationTime;
