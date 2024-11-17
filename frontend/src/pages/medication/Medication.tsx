/** @jsxImportSource @emotion/react */

import { TopBar } from '@/shared/ui/TopBar';
import {
  addMedicineBtnCss,
  container,
  content,
  medicineListCss,
  topbarCss,
} from './Medication.styles';
import { Button } from '@/shared/ui/Button';
import MedicationItem from './ui/MedicationItem/MedicationItem';

const Medication = () => {
  return (
    <div css={container}>
      <TopBar type="iconpage" css={topbarCss}>
        약 챙기기
      </TopBar>
      <div css={content}>
        <div css={addMedicineBtnCss}>
          <Button
            color="primary"
            fontSize="1"
            variant="contained"
            handler={() => {}}
          >
            약 등록
          </Button>
        </div>
        <div css={medicineListCss}>
          <MedicationItem />
        </div>
      </div>
    </div>
  );
};

export default Medication;
