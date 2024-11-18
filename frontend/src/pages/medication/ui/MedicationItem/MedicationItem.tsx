/** @jsxImportSource @emotion/react */

import {
  alertImgCss,
  alertItemCss,
  medicineChipCss,
  medicineContentCss,
  medicineInfoCss,
  medicineItemCss,
  medicineTextCss,
  medicineTitleCss,
} from './MedicationItem.styles';
import { Typography } from '@/shared/ui/Typography';
import { mainIcons } from '@/pages/MainPage/constants/iconsData';
import { Chip } from '@/shared/ui/Chip';
import { MedicationItemType } from '../../types';

type MedicationItemProps = {
  medication: MedicationItemType;
};
const MedicationItem = (props: MedicationItemProps) => {
  console.log(props)
  return (
    <div css={medicineItemCss}>
      <div css={medicineTextCss}>
        <div css={medicineTitleCss}>
          <Typography color="dark" size="1" weight={600}>
            약 이름
          </Typography>
          <Chip
            border={1}
            color="primary"
            fontSize={0.75}
            fontWeight={600}
            css={medicineChipCss}
          >
            속효성
          </Chip>
        </div>
        <div css={medicineContentCss}>
          <Typography
            color="dark"
            size="0.75"
            weight={600}
            css={medicineInfoCss}
          >
            <span>약 용량 단위(U) /1회</span>
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
      </div>
    </div>
  );
};

export default MedicationItem;
