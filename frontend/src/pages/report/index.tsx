/** @jsxImportSource @emotion/react */

import { TopBar } from '@/shared/ui/TopBar';
import { Item } from './ui/item';
import { SliderItem } from './ui/slider-item';
import { GptContent } from './ui/gpt-content';
import { useNavigate } from 'react-router-dom';
import { WeekChart } from './ui/chart/week-chart';
import { useQuery } from '@tanstack/react-query';
import { getreport } from './api/api';

export const Report = () => {
  const nav = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['bloodSugarReport'],
    queryFn: getreport,
  });

  console.log(data?.data.data
  )

  if (isLoading) {
    console.log('Loading data...');
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('Error:', error);
    return <div>Error occurred!</div>;
  }
  return (
    <div>
      <TopBar type="iconpage" iconHandler={()=>nav('/menu')}>주간 리포트</TopBar>
      <WeekChart data={data?.data.data.glucoseMeasurementItmeList}/>
      <Item title="혈당관리지표(GMI)" ment={Number(data?.data.data.gmi).toFixed(1)} unit="%" />
      <SliderItem title="이번주 평균 혈당" max={400} standard={100} ment={Number(data?.data.data.abg).toFixed(1)} unit="mg/dl" url = '/report/detail/mean'/>
      <SliderItem title="혈당 변동성" max={100} standard={36} ment={Number(data?.data.data.cv).toFixed(1)} unit="%" url = '/report/detail/gv'/>
      <SliderItem title="목표 범위 내 비율" max={100} standard={20} ment={Number(data?.data.data.tir).toFixed(1)} unit="%" url = '/report/detail/tir'/>
      <GptContent />
    </div>
  );
};
