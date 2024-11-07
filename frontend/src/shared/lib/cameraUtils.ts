import { Camera, CameraResultType, PermissionStatus } from '@capacitor/camera';
import { useState } from 'react';

// 사진을 찍는 함수
export const useCamera = () => {
  const [imageUrl, setImageUrl] = useState('');

  // 카메라 권한 확인 함수
  const checkCamera = async (): Promise<boolean> => {
    const permissions: PermissionStatus = await Camera.checkPermissions();
    console.log("현재 카메라 권한 상태:", permissions.camera); // 현재 권한 상태 로그 출력

    if (permissions.camera === 'granted') {
      return true;
    }

    const requestPermissions = await Camera.requestPermissions();
    console.log("요청 후 카메라 권한 상태:", requestPermissions.camera); // 권한 요청 후 상태 로그 출력
    return requestPermissions.camera === 'granted';
  };

  const openCamera = async () => {
    const hasPermission = await checkCamera();
    console.log("카메라 접근 허용 여부:", hasPermission);

    if (hasPermission) {
      const image = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.Uri,
      });
      setImageUrl(image.webPath || '');
    } else {
      console.log('카메라 권한이 거부되었습니다.');
    }
  };

  return { openCamera, imageUrl };
};
