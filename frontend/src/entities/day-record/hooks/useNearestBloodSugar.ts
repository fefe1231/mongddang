import { useMemo } from 'react';
import { DayRecordTypes } from '@/shared/api/day-record';
import { Bloodsugar } from '@/shared/api/blood-sugar';
import { findNearestTimeBloodSugar } from '../lib/findNearestBloodSugar';
import { RecordCategory } from '../api';

interface BloodSugarValues {
  startTime: number;
  endTime: number | null;
}

export const useNearestBloodSugar = <T extends RecordCategory>(
  recordData: DayRecordTypes[T] | undefined,
  bloodSugarData: Bloodsugar[] | undefined
) => {
  const nearestBloodSugarValues = useMemo(() => {
    if (!recordData || !bloodSugarData) return {};

    return recordData.reduce(
      (acc, record) => {
        const startTimeVal = findNearestTimeBloodSugar(
          bloodSugarData,
          record.startTime
        );

        const endTimeVal = record.endTime
          ? findNearestTimeBloodSugar(bloodSugarData, record.endTime)
          : null;

        return {
          ...acc,
          [record.startTime]: {
            startTime: startTimeVal,
            endTime: endTimeVal,
          },
        };
      },
      {} as Record<string, BloodSugarValues>
    );
  }, [recordData, bloodSugarData]);

  return nearestBloodSugarValues;
};
