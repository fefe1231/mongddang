// import { BloodsugarQueries } from '@/entities/blood-sugar/api';
// import { useUserStore } from '@/entities/user/model/store';
// import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
// import { LineChart } from 'recharts';

export const BloodSugarChart = () => {
  const { date } = useParams();
  if (typeof date === 'undefined') {
    throw new Error('Impossible date');
  }
  // const { getUser } = useUserStore((state) => ({ getUser: state.getUser }));
  // const user = getUser();
  // const nickname = user?.nickname ?? '';

  // const { data, isError, isLoading } = useQuery(
  //   BloodsugarQueries.todayBloodSugarQuery(nickname, date)
  // );

  // if (isError) {
  //   console.log('Bloodsugarchart error');
  //   throw new Error('Bloodsugarchart error');
  // }

  // if (isLoading) return null;
  return (
    <>
      {/* <LineChart
        h={300}
        w={1000}
        data={data}
        dataKey="measurementTime"
        series={[{ name: 'bloodSugarLevel', color: 'indigo.6' }]}
        dotProps={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
        curveType="linear"
        style={{ margin: '10px' }}
      /> */}
    </>
  );
};
