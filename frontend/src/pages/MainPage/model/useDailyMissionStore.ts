import { create } from 'zustand';
import { getDailyMission } from '../api/infoApi';

type MissionInfo = {
  name: string;
  reward: number;
  status: string;
};

type DailyMissionInfo = {
  missions: MissionInfo[];
  getMissions: () => void;
};

export const useDailyMissionStore = create<DailyMissionInfo>((set) => ({
  missions: [],
  getMissions: async () => {
    const missionList = await getDailyMission();
    if (missionList) {
      set({
        missions: missionList,
      });
    }
  },
}));
