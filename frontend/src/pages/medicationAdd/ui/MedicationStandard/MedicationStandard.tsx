/** @jsxImportSource @emotion/react */

import { TextField } from '@/shared/ui/TextField';
import { Typography } from '@/shared/ui/Typography';
import { amountCss, amountFieldCss, amountGroup, amountNumCss } from './MedicationStandard.styles';

const MedicationStandard = () => {
  return (
    <div css={amountGroup}>
      <div css={amountCss}>
        <Typography color="dark" size="1" weight={600}>
          약 용량
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
          placeholder="최소 혈당"
          type="text"
          variant="standard"
          css={amountFieldCss}
        />
        <Typography color="dark" size="1.25" weight={600}>
          ~
        </Typography>
        <TextField
          color="primary"
          defaultValue=""
          label=""
          placeholder="최대 혈당"
          type="text"
          variant="standard"
          css={amountFieldCss}
        />
        <Typography color="dark" size="1.25" weight={600}>
          =
        </Typography>
        <TextField
          color="primary"
          defaultValue=""
          label=""
          placeholder="단위(U)"
          type="text"
          variant="standard"
          css={amountFieldCss}
        />
      </div>
    </div>
  );
};

export default MedicationStandard;
