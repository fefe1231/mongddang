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
import { useUserStore } from '@/entities/user/model';
import { useMedicationQuery } from './model/useMedicationQuery';
import { useNavigate } from 'react-router-dom';

type MedicationStandard = {
  volume: number;
  minGlucose: number;
  maxGlucose: number;
};

export type MedicationItemType = {
  nickname: string;
  name: string;
  image: File | null;
  repeatStartTime: Date;
  repeatEndTime: Date;
  isFast: boolean;
  repeatTimes: string[];
  standards: MedicationStandard[] | null;
};

const Medication = () => {
  const userRole = useUserStore((state) => state.user?.role);
  const selfNickname = useUserStore((state) => state.user?.nickname);
  const kidNickname = '아이 닉네임';
  const { data: medicationList } = useMedicationQuery(
    userRole === 'child'
      ? selfNickname
      : userRole === 'protector'
        ? kidNickname
        : ''
  );
  const navigate = useNavigate();
  console.log(userRole);
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
            handler={() => {
              navigate(
                userRole === 'child'
                  ? '/menu'
                  : userRole === 'protector'
                    ? '/protector-main'
                    : ''
              );
            }}
          >
            약 등록
          </Button>
        </div>
        <div css={medicineListCss}>
          {medicationList?.map((medication: MedicationItemType) => {
            return (
              <MedicationItem
                medication={medication}
                key={`${medication.nickname}-medication-${medication.repeatStartTime}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Medication;
