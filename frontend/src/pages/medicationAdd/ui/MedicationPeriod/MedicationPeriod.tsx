/** @jsxImportSource @emotion/react */

import { TextField } from '@/shared/ui/TextField';
import { Typography } from '@/shared/ui/Typography';
import {
  inputPeriodCss,
  periodCss,
  periodFieldCss,
  periodItemCss,
} from './MedicationPeriod.styles';

const MedicationPeriod = () => {
  return (
    <div css={inputPeriodCss}>
      <Typography color="dark" size="1" weight={600}>
        약 먹는 기간
      </Typography>
      <div css={periodCss}>
        <div css={periodItemCss}>
          <TextField
            color="primary"
            defaultValue=""
            label="시작)"
            placeholder="YYYY"
            type="text"
            variant="standard"
            css={periodFieldCss}
          />
          <Typography color="dark" size="1" weight={500}>
            년
          </Typography>
          <TextField
            color="primary"
            defaultValue=""
            label=""
            placeholder="MM"
            type="text"
            variant="standard"
            css={periodFieldCss}
          />
          <Typography color="dark" size="1" weight={500}>
            월
          </Typography>
          <TextField
            color="primary"
            defaultValue=""
            label=""
            placeholder="DD"
            type="text"
            variant="standard"
            css={periodFieldCss}
          />
          <Typography color="dark" size="1" weight={500}>
            일
          </Typography>
        </div>
        <div css={periodItemCss}>
          <TextField
            color="primary"
            defaultValue=""
            label="끝)"
            placeholder="YYYY"
            type="text"
            variant="standard"
            css={periodFieldCss}
          />
          <Typography color="dark" size="1" weight={500}>
            년
          </Typography>
          <TextField
            color="primary"
            defaultValue=""
            label=""
            placeholder="MM"
            type="text"
            variant="standard"
            css={periodFieldCss}
          />
          <Typography color="dark" size="1" weight={500}>
            월
          </Typography>
          <TextField
            color="primary"
            defaultValue=""
            label=""
            placeholder="DD"
            type="text"
            variant="standard"
            css={periodFieldCss}
          />
          <Typography color="dark" size="1" weight={500}>
            일
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MedicationPeriod;
