/** @jsxImportSource @emotion/react */

import { TopBar } from '@/shared/ui/TopBar';
import {
  container,
  content,
  inputContentCss,
  inputContentItemCss,
  medicationAddBtnCss,
  medicationTypeGroupCss,
  medicationTypeItemCss,
  textFieldCss,
  titieCss,
  topbarCss,
} from './MedicationAdd.styles';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@/shared/ui/TextField';
import { Typography } from '@/shared/ui/Typography';
import ToggleNone from '@/assets/img/medication_none.svg.svg';
import ToggleSelected from '@/assets/img/medication_selected.svg.svg';
import { useState } from 'react';
import MedicationStandard from './ui/MedicationStandard/MedicationStandard';
import MedicationImg from './ui/MedicationImg/MedicationImg';
import MedicationPeriod from './ui/MedicationPeriod/MedicationPeriod';
import MedicationTime from './ui/MedicationTime/MedicationTime';
import { Button } from '@/shared/ui/Button';
import MedicationOnce from './ui/MedicationOnce/MedicationOnce';

const MedicationAdd = () => {
  const navigate = useNavigate();
  const [isFast, setIsFast] = useState(false);
  const [medicationImgFile, setMedicationImgFile] = useState<File | null>(null);
  const handleToggle = () => {
    setIsFast(!isFast);
  };
  // 약 이미지 등록
  const handleMedicationImg = (file: File | null) => {
    if (file) {
      setMedicationImgFile(file);
    }
  };
  return (
    <div css={container}>
      <TopBar
        type="iconpage"
        css={topbarCss}
        iconHandler={() => {
          navigate('/medication');
        }}
      >
        약 등록
      </TopBar>
      <div css={content}>
        <div css={medicationTypeGroupCss}>
          <div css={titieCss}>
            <Typography color="dark" size="1" weight={600}>
              약 종류
            </Typography>
          </div>
          <div css={medicationTypeItemCss} onClick={handleToggle}>
            <img src={isFast ? ToggleNone : ToggleSelected} alt="toggle" />
            <Typography color="dark" size="1" weight={500}>
              하루 인슐린
            </Typography>
          </div>
          <div css={medicationTypeItemCss} onClick={handleToggle}>
            <img src={isFast ? ToggleSelected : ToggleNone} alt="toggle" />
            <Typography color="dark" size="1" weight={500}>
              식사 인슐린
            </Typography>
          </div>
        </div>
        <div css={inputContentCss}>
          <div css={inputContentItemCss}>
            <Typography color="dark" size="1" weight={600}>
              약 이름
            </Typography>
            <TextField
              color="primary"
              defaultValue=""
              label=""
              placeholder="약 이름이 뭐야? ex) 리조텍"
              type="text"
              variant="standard"
              css={textFieldCss}
            />
          </div>
          <MedicationPeriod />
          <MedicationTime />
          {isFast ? <MedicationStandard /> : <MedicationOnce />}
          <MedicationImg handleMedicationImg={handleMedicationImg} />
        </div>
        <div css={medicationAddBtnCss}>
          <Button
            color="primary"
            fontSize="1.25"
            isShadow
            fullwidth
            variant="contained"
            handler={() => {}}
          >
            약 저장 하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicationAdd;
