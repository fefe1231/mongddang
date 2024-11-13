import { useMemo } from 'react';
import { MealRecord } from '@/shared/api/day-record';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { findNearestTimeBloodSugar } from '../lib/findNearestBloodSugar';

export const useNearestBloodSugar = (
  mealData: MealRecord[] | undefined,
  bloodSugarData: Bloodsugar[] | undefined
) => {
  const nearestBloodSugarValues = useMemo(() => {
    if (!mealData || !bloodSugarData) return {};

    return mealData.reduce(
      (acc, meal) => {
        const nearestValue = findNearestTimeBloodSugar(
          bloodSugarData,
          meal.startTime
        );
        return {
          ...acc,
          [meal.startTime]: nearestValue,
        };
      },
      {} as Record<string, number>
    );
  }, [mealData, bloodSugarData]);

  return nearestBloodSugarValues;
};
