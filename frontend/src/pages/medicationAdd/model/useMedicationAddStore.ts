import { MedicationStandard } from '@/pages/medication/types';
import { create } from 'zustand';

type MedicationAddItem = {
  nickname: string;
  name: string;
  image: File | null;
  repeatStartTime: Date | null;
  repeatEndTime: Date | null;
  isFast: boolean;
  repeatTimes: string[];
  standards: MedicationStandard[] | null;
  setUserInfo: (nickname: string) => void;
  setMedicationInfo: (name: string) => void;
  setMedicationPeriod: (startDate: Date, endDate: Date) => void;
  setMedicationTime: (repeatTime: string[]) => void;
  setStandard: (standard: MedicationStandard[]) => void;
  initializeAdd: () => void;
};

export const useMedicationAddStore = create<MedicationAddItem>((set) => ({
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

  // 닉네임 정보
  setUserInfo: (nickname: string) => {
    set({ nickname: nickname });
    console.log('store에 들어온', nickname);
  },

  // 약 정보
  setMedicationInfo: (name: string) => {
    set({
      name: name,
    });
  },

  // 약 사진
  setMedicationImg: (medicationImg: File) => {
    set({
      image: medicationImg,
    });
  },

  // 복약 기간
  setMedicationPeriod: (startDate: Date, endDate: Date) => {
    set({
      repeatStartTime: startDate,
      repeatEndTime: endDate,
    });
    console.log(startDate, endDate);
  },

  // 복약 시간
  setMedicationTime: (repeatTime: string[]) => {
    set({
      repeatTimes: repeatTime,
    });
  },

  // 복약 용량
  setStandard: (standard: MedicationStandard[]) => {
    set({
      standards: standard,
    });
  },

  // 스토어 초기화
  initializeAdd: () => {
    set({
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
    });
  },
}));
