import { Bloodsugar } from '@/shared/api/blood-sugar';

export const findNearestTimeBloodSugar = (
  data: Bloodsugar[],
  targetTime: string
): number => {
  // HH:mm 형식의 시간을 분 단위로 변환하는 함수
  const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);

    return hours * 60 + minutes;
  };

  // 두 시간 간의 차이를 분 단위로 계산하는 함수
  const getTimeDifference = (time1: number, time2: number): number => {
    return Math.abs(time1 - time2);
  };

  // 타겟 시간을 분으로 변환
  const targetMinutes = convertTimeToMinutes(targetTime);

  let left = 0;
  let right = data.length - 1;
  let nearestEntry = data[0].bloodSugarLevel;
  let minDiff = Infinity;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentMinutes = convertTimeToMinutes(data[mid].measurementTime);
    const timeDiff = getTimeDifference(targetMinutes, currentMinutes);

    // 현재 시간이 타겟 시간과의 차이가 더 작으면 업데이트
    if (timeDiff < minDiff) {
      minDiff = timeDiff;
      nearestEntry = data[mid].bloodSugarLevel;
    }

    // 이진 탐색 진행
    if (currentMinutes < targetMinutes) {
      left = mid + 1;
    } else if (currentMinutes > targetMinutes) {
      right = mid - 1;
    } else {
      // 정확히 일치하는 시간을 찾은 경우
      return data[mid].bloodSugarLevel;
    }
  }

  return nearestEntry;
};
