/** @jsxImportSource @emotion/react */
import addPictureIcon from '@/assets/img/add_photo.svg';
import { imgContainer, imgGuideCss } from './DietImage.styles';
import { Typography } from '@/shared/ui/Typography';
import { takePicture } from '@/shared/lib/cameraUtils';

const DietImage = () => {
  const { imageUrl, openCamera } = takePicture();
  return (
    <div
      css={imgContainer}
      onClick={() => {
        openCamera();
      }}
    >
      {imageUrl !== '' ? (
        <img src={imageUrl} alt="식단 사진" width='100%' style={{ objectFit: 'contain' }} />
      ) : (
        <div css={imgGuideCss}>
          <img src={addPictureIcon} alt="식단 사진" />
          <Typography color="dark" size="1" weight={500} scale="500">
            뭐 먹는지 찍어줘!
          </Typography>
          
        </div>
      )}
    </div>
  );
};

export default DietImage;
