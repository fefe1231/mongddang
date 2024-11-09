export type GlucoseStatus = 'normal' | 'high' | 'low';

export type GlucoseData = {
  id: number;
  bloodSugarLevel: number;
  measurementTime: string;
  content: string | null;
  status: GlucoseStatus;
  notification: boolean;
};

export const GlucoseKeys = 