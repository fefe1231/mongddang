import { MedicationItemType } from '@/pages/medication/types';
import { create } from 'zustand';

export const useMedicationAddStore = create<MedicationItemType>((set, get) => ({
  nickname: '',
  name: '',
  image: null,
  repeatStartTime: null,
  repeatEndTime: null,
  isFast: false,
  repeatTimes: [''],
  standards: [
    {
      volume: 0,
      minGlucose: 0,
      maxGlucose: 0,
    },
  ],

  setRepeatTimes : () => {
    
  }
}));
