/** @jsxImportSource @emotion/react */

import {
  alertImgCss,
  alertItemCss,
  medicineImgCss,
  medicineInfoCss,
  medicineItemCss,
  medicineTextCss,
} from './MedicationItem.styles';
import { Typography } from '@/shared/ui/Typography';
import { mainIcons } from '@/pages/MainPage/constants/iconsData';

const MedicationItem = () => {
  return (
    <div css={medicineItemCss}>
      <div css={medicineTextCss}>
        <Typography color="dark" size="1" weight={600}>
          약 이름
        </Typography>
        <Typography color="dark" size="0.75" weight={600} css={medicineInfoCss}>
          <span>약 용량 단위(U) /1회</span>
          <span>|</span>
          <span>주사</span>
        </Typography>
        <Typography color="dark" size="0.75" weight={600}>
          2024.01.29 ~ 2024.02.10
        </Typography>
        <div css={alertItemCss}>
          <img src={mainIcons.notification} alt="alert" css={alertImgCss} />
          <Typography color="dark" size="0.75" weight={600}>
            9:30 | 12:30 | 19:30
          </Typography>
        </div>
      </div>
      <div css={medicineImgCss}></div>
    </div>
  );
};

export default MedicationItem;
