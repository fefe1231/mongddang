import { Camera, CameraResultType, PermissionStatus } from '@capacitor/camera';
import { useState } from 'react';

// 사진을 찍는 함수
export const useCamera = () => {
  // 찍힌 이미지의 url
  const [imageUrl, setImageUrl] = useState('');

  // 카메라 권한 확인 함수
  const checkCamera = async (): Promise<boolean> => {
    const permissions: PermissionStatus = await Camera.checkPermissions();
    if (permissions.camera === 'granted') {
      return true;
    }

    const requestPermissions = await Camera.requestPermissions();
    return requestPermissions.camera === 'granted';
  };

  const openCamera = async () => {
    // 1. 카메라 권한 확인
    const hasPermission = await checkCamera();

    // 2. 권한이 있다면 사진 가져오기(촬영), 없으면 권한 요청
    console.log(hasPermission)

    if (hasPermission) {
      const image = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.Uri,
      });

      // 3. 찍은 사진 이미지 url state에 저장
      setImageUrl(image.webPath || '');
    } else {
      console.log('사진 촬영 실패');
    }
  };

  // 4. 사진 촬영 함수, 촬영된 사진의 url을 반환
  return { openCamera, imageUrl };
};
