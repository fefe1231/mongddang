/** @jsxImportSource @emotion/react */

import { TopBar } from '@/shared/ui/TopBar';
import {
  addMedicineBtnCss,
  alertImgCss,
  alertItemCss,
  container,
  content,
  medicineImgCss,
  medicineInfoCss,
  medicineItemCss,
  medicineListCss,
  medicineTextCss,
  topbarCss,
} from './Medication.styles';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import { mainIcons } from '../MainPage/constants/iconsData';

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
          <div css={medicineItemCss}>
            <div css={medicineTextCss}>
              <Typography color="dark" size="1" weight={600}>
                약 이름
              </Typography>
              <Typography
                color="dark"
                size="0.75"
                weight={600}
                css={medicineInfoCss}
              >
                <span>약 용량 단위(U) /1회</span>
                <span>|</span>
                <span>주사</span>
              </Typography>
              <Typography color="dark" size="0.75" weight={600}>
                2024.01.29 ~ 2024.02.10
              </Typography>
              <div css={alertItemCss}>
                <img
                  src={mainIcons.notification}
                  alt="alert"
                  css={alertImgCss}
                />
                <Typography color="dark" size="0.75" weight={600}>
                  9:30 | 12:30 | 19:30
                </Typography>
              </div>
            </div>
            <div css={medicineImgCss}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medication;
