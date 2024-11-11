import { BloodsugarQueries } from '@/entities/blood-sugar/api';
import { LineChart } from '@mantine/charts';
import { useUserStore } from '@/entities/user/model/store';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { useEffect, useState, useRef } from 'react';
import { MAX_CHART_WIDTH, MIN_CHART_WIDTH, POINT_CHART_WIDTH } from '../config';
import { ScrollArea } from '@mantine/core';

export const BloodSugarChart = () => {
  const { date } = useParams();
  if (typeof date === 'undefined') {
    throw new Error('Impossible date');
  }
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState<number>(MIN_CHART_WIDTH);
  const { getUser } = useUserStore(
    useShallow((state) => ({ getUser: state.getUser }))
  );
  const user = getUser();
  const nickname = user?.nickname ?? 'test-chart-data';

  const { data, isError, isLoading } = useQuery(
    BloodsugarQueries.todayBloodSugarQuery(nickname, date)
  );

  // data 양에 따라 그래프 길이 조절
  useEffect(() => {
    setChartWidth(
      data
        ? Math.max(
            MIN_CHART_WIDTH,
            Math.min(MAX_CHART_WIDTH, data.length * POINT_CHART_WIDTH)
          )
        : MIN_CHART_WIDTH
    );
  }, [data]);

  // mount 시 linechart의 가장 오른쪽으로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      if (viewportRef.current) {
        viewportRef.current.scrollTo({
          left: viewportRef.current.scrollWidth,
          behavior: 'smooth',
        });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [data]);

  if (isError) {
    console.log('Bloodsugarchart error');
    throw new Error('Bloodsugarchart error');
  }

  if (isLoading) return null;

  return (
    <>
      {data && (
        <ScrollArea w={360} h={350} viewportRef={viewportRef}>
          <LineChart
            h={'18rem'}
            w={chartWidth}
            data={data}
            dataKey="measurementTime"
            curveType="bump"
            // type="gradient"
            // gradientStops={[
            //   { offset: 0, color: 'gray.6' },
            // ]}
            strokeWidth={3}
            withLegend
            legendProps={{ verticalAlign: 'bottom', height: 50 }}
            series={[
              {
                name: 'bloodSugarLevel',
                label: '혈당 수치',
                color: 'indigo.6',
              },
            ]}
            // withDots={false}
            dotProps={{ r: 4, strokeWidth: 1.5, stroke: '#fff' }}
            activeDotProps={{ r: 6, strokeWidth: 1.5, fill: '#fff' }}
            yAxisProps={{ domain: [30, 250] }}
            strokeDasharray="10 10"
            tooltipAnimationDuration={300}
            referenceLines={[
              { y: 50, label: '저혈당 위험', color: 'red.6' },
              { y: 140, label: '고혈당 위험', color: 'yellow.5' },
            ]}
            style={{ margin: '30px' }}
          />
        </ScrollArea>
      )}
    </>
  );
};
