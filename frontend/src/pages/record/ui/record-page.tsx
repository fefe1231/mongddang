import { TopBar } from '@/shared/ui/TopBar';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import { Center } from '@mantine/core';
import dayjs from 'dayjs';
// import { LineChart, LineChartSeries } from '@mantine/charts';
// import { ScrollArea } from '@mantine/core';
// import axios from 'axios';

// type ChartData = {
//   date: string;
//   Glucose: number;
//   Oranges: number;
//   Tomatoes: number;
// };

// type Data = 'data';

// const fetchGlucoseData = async () => {
//   try {
//     const res = await axios.get('/frontend/public/dummy/glucose-data.json');
//     return res.data.json();
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

const setDayProps: DatePickerProps['getDayProps'] = (date) => {
  const formattedDay = String(dayjs().toDate().getDate()).padStart(2, '0');

  if (dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
    return {
      style: {
        textDecoration: 'underline',
      },
      children: formattedDay,
    };
  }

  return {
    children: formattedDay,
  };
};

export const RecordPage = () => {
  const nav = useNavigate();

  // const [data, setData] = useState<Record<Data, ChartData>[]>([]);

  const [dateValue, setDateValue] = useState<Date | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // const checkMeal = (series: LineChartSeries) => ({
  //   dot:
  //     series.name === 'BeforeMeal' || series.name === 'AfterMeal'
  //       ? { r: 6 }
  //       : {},
  // });

  const handleDoubleClick = (date: Date) => {};

  // mount 시 linechart의 가장 오른쪽으로 이동
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        left: viewportRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  // chart data 저장
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await fetchGlucoseData();
  //     setData(data);
  //   };
  //   getData();
  // }, []);

  return (
    <>
      <header>
        <TopBar type="iconpage" iconHandler={() => nav(-1)}>
          내 기록
        </TopBar>
      </header>
      {/* Calendar start */}
      <Center>
        <DatePicker
          value={dateValue}
          onChange={setDateValue}
          type="default"
          size="lg"
          getDayProps={setDayProps}
        />
      </Center>
      {/* Calendar end */}

      {/* LineChart start */}
      {/* <ScrollArea w={700} h={350} viewportRef={viewportRef}>
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
      </ScrollArea> */}
      {/* LineChart end */}
      <div>record page</div>
    </>
  );
};
