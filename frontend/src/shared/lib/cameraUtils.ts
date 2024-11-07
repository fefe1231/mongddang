import { Camera, CameraResultType, PermissionStatus } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';

// 사진을 찍는 함수
export const useCamera = () => {
  let file: File | null = null;
  let imageUrl: string | '' = '';

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

    // 2. 권한이 있다면 사진 가져오기(촬영)
    if (hasPermission) {
      const image = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.Uri,
      });

      // 3. 찍은 사진 이미지 url state에 저장
      console.log('이미지 있니', image.webPath);
      imageUrl = image.webPath ? image.webPath : '';

      console.log('리드 파일', imageUrl);

      const readFile = await Filesystem.readFile({
        path: imageUrl.replace(/_capacitor_file_/, ''),
      });

      console.log('리드 파일', readFile.data);

      file = new File([readFile.data as Blob], `photo_${Date.now()}.jpeg`, {
        type: 'image/jpeg',
      });

      console.log('리드 파일', file.name);
      console.log('넘어가지', imageUrl);
      const returnData = { file, imageUrl };
      return returnData;
    }

    return { file: null, imageUrl: '' };
  };

  // 4. 사진 촬영 함수, 촬영된 사진의 url을 반환
  return { openCamera };
};
