import { useEffect, useRef, useState } from 'react';
import { LineChart } from '@mantine/charts';
import { ScrollArea } from '@mantine/core';
import axios from 'axios';

type StatusType = 'normal' | 'high' | 'low';
type Data = {
  id: number;
  bloodSugarLevel: number;
  measurementTime: string;
  content: string | null;
  status: StatusType;
  notification: boolean;
};
interface ApiRes {
  code: number;
  message: string;
  data: {
    bloodSugar: Data[];
  };
};

export const TodayRecordPage = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [dataSeriese, setDataSeriese] = useState<Data[]>([]);

  const fetchGlucoseData = async (): Promise<ApiRes> => {
    try {
      const res = await axios.get('/dummy/glucose-data.json');
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

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
  useEffect(() => {
    const getData = async () => {
      const data = await fetchGlucoseData();
      setDataSeriese(data.data.bloodSugar);
    };
    getData();
  }, []);

  return (
    <>
      {/* LineChart start */}
      <ScrollArea w={360} h={350} viewportRef={viewportRef}>
        <LineChart
          h={300}
          w={1000}
          data={dataSeriese}
          dataKey="measurementTime"
          series={[{ name: 'bloodSugarLevel', color: 'indigo.6' }]}
          dotProps={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
          curveType="linear"
          // lineProps={checkMeal}
          style={{ margin: '10px' }}
        />
      </ScrollArea>
      {/* LineChart end */}
    </>
  );
};
