import { TopBar } from '@/shared/ui/TopBar';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, LineChartSeries } from '@mantine/charts';
import { data } from './data.ts';
import { DatePicker } from '@mantine/dates';
import { ScrollArea } from '@mantine/core';

export const RecordPage = () => {
  const nav = useNavigate();

  const [value, setValue] = useState<Date[]>([]);
  const viewportRef = useRef<HTMLDivElement>(null);

  const checkMeal = (series: LineChartSeries) => ({
    dot:
      series.name === 'BeforeMeal' || series.name === 'AfterMeal'
        ? { r: 6 }
        : {},
  });

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
      <header>
        <TopBar type="iconpage" iconHandler={() => nav(-1)}>
          내 기록
        </TopBar>
      </header>
      {/* Calendar start */}
      <DatePicker type="multiple" value={value} onChange={setValue} />
      {/* Calendar end */}

      {/* LineChart start */}
      <ScrollArea w={700} h={350} viewportRef={viewportRef}>
        <LineChart
          h={300}
          w={1000}
          data={data}
          dataKey="date"
          series={[
            { name: 'Glucose', color: 'indigo.6' },
            { name: 'BeforeMeal', color: 'orange.9' },
            { name: 'AfterMeal', color: 'orange.9' },
          ]}
          dotProps={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
          curveType="linear"
          lineProps={checkMeal}
          style={{ margin: '10px' }}
        />
      </ScrollArea>
      {/* LineChart end */}
      <div>record page</div>
    </>
  );
};
