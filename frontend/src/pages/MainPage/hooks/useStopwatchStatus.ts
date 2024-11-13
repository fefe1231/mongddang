import { Preferences } from "@capacitor/preferences";

// 앱 닫을 때 루틴 스톱워치 저장
export const setStopwatch = async (time: number) => {
  await Preferences.set({
    key: 'prevTime',
    value: time.toString(),
  });
  console.log('마지막 스톱워치 저장', time.toString());
};

// 앱 닫을 때 마지막 시간 저장
export const setExitTime = async (exitTime:number) =>{
    await Preferences.set({
        key: 'exitTime',
        value: exitTime.toString()
    })
    console.log('exitTime 저장', exitTime)
}