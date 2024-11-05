
export interface ItitleData {
  titleId: number;
  titleName: string;
  description: string;
  executionCount: number;
  count: number;
  category: 'meal' | 'sleeping' | 'exercise' | 'medication';
  isOwned: boolean;
  isNew: boolean;
  isMain: boolean;
}

export interface ItitleInfo {
  code: string;
  message: string;
  data: ItitleData[];
}

export interface IAchievement {
  achievementId: number
}