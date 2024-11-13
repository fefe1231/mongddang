import { useMemo } from 'react';
import { DayRecordTypes } from '@/shared/api/day-record';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { findNearestTimeBloodSugar } from '../lib/findNearestBloodSugar';
import { RecordCategory } from '../api';

export const useNearestBloodSugar = <T extends RecordCategory>(
  recordData: DayRecordTypes[T] | undefined,
  bloodSugarData: Bloodsugar[] | undefined
) => {
  const nearestBloodSugarValues = useMemo(() => {
    if (!recordData || !bloodSugarData) return {};

    return recordData.reduce(
      (acc, record) => {
        const nearestValue = findNearestTimeBloodSugar(
          bloodSugarData,
          record.startTime
        );
        return {
          ...acc,
          [record.startTime]: nearestValue,
        };
      },
      {} as Record<string, number>
    );
  }, [recordData, bloodSugarData]);

  return nearestBloodSugarValues;
};
