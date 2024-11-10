import { Preferences } from '@capacitor/preferences';

export const setRoutine = async (routine:string) => {
  await Preferences.set({
    key: 'routine',
    value: routine,
  });
};
