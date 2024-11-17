/** @jsxImportSource @emotion/react */

import { TextField } from '@/shared/ui/TextField';
import { Typography } from '@/shared/ui/Typography';
import {
  amountCss,
  amountGroup,
  amountNumCss,
  timeFieldCss,
} from './MedicationTime.styles';
import { useMedicationTimeStore } from '../../model/useMedicationTimeStore';

const MedicationTime = () => {
  const { timeFields, addTimeField, deleteTimeField } =
    useMedicationTimeStore();

  const handleTimeField = () => {
    addTimeField();
  };

  const removeTimeField = () => {
    deleteTimeField();
  };

  return (
    <div css={amountGroup}>
      <div css={amountCss}>
        <Typography color="dark" size="1" weight={600}>
          약 먹는 시간
        </Typography>
        <Typography
          color="dark"
          size="1.25"
          weight={600}
          onClick={handleTimeField}
        >
          +
        </Typography>
      </div>
      {timeFields.map((item) => {
        console.log(item.id);
        return (
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
            {timeFields.length === item.id ? (
              <Typography
                color="dark"
                size="1.5"
                weight={600}
                onClick={() => removeTimeField()}
              >
                -
              </Typography>
            ) : (
              <Typography
                color="dark"
                size="1.5"
                weight={600}
                style={{ opacity: 0 }}
              >
                -
              </Typography>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MedicationTime;
