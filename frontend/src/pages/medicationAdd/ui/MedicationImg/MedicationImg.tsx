/** @jsxImportSource @emotion/react */

import addPictureIcon from '@/assets/img/add_photo.svg';
import { Typography } from '@/shared/ui/Typography';
import { useCamera } from '@/shared/lib/cameraUtils';
import { useState } from 'react';
import { imgContainer, imgGuideCss, medicationImgCss } from './MedicationImg.styles';

type MedicationImgProps = {
  handleMedicationImg: (file: File | null) => void;
};

const MedicationImg = (props: MedicationImgProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(''); // 미리보기용
  const { openCamera } = useCamera();

  // 촬영하기 클릭 시
  const handleCapture = async () => {
    const returnData = await openCamera();

    // 허가를 안했거나, 촬영한 파일이 없는 경우
    if (returnData.file == null) {
      console.log('추후 권한을 다시 설정하는 방법을 안내');
      return;
    }
    props.handleMedicationImg(returnData.file);
    setPreviewUrl(returnData.imageUrl);
  };

  return (
    <div css={medicationImgCss}>
      <Typography color="dark" size="1" weight={600}>
        약 사진
      </Typography>
      <div css={imgContainer} onClick={handleCapture}>
        {/* 사진 입력 시 미리보기 */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="식단 사진"
            width="100%"
            height="100%"
            style={{ objectFit: 'contain' }}
          />
        ) : (
          // 촬영 안내
          <div css={imgGuideCss}>
            <img src={addPictureIcon} alt="식단 사진" />
            <Typography color="dark" size="1" weight={500} scale="500">
              약 사진을 찍어줘! (선택사항)
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationImg;
