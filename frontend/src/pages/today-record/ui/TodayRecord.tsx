import { useEffect, useRef } from 'react';
import { ScrollArea } from '@mantine/core';
import { BloodSugarChart } from '@/widgets/blood-sugar-chart/blood-sugar-chart-ui';

export const TodayRecordPage = () => {
  const viewportRef = useRef<HTMLDivElement>(null);

  // mount 시 linechart의 가장 오른쪽으로 이동
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        left: viewportRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <>
      {/* LineChart start */}
      <ScrollArea w={360} h={350} viewportRef={viewportRef}>
        <BloodSugarChart />
      </ScrollArea>
      {/* LineChart end */}
    </>
  );
};
