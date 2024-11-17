import { useQuery } from '@tanstack/react-query';
import { getMedicationList } from '../api/medicactionApi';

export const useMedicationQuery = (nickname: string) => {
  const fetchMedication = async ({ queryKey }: { queryKey: string[] }) => {
    const [, userNickname] = queryKey;
    return getMedicationList(userNickname);
  };
  return useQuery({
    queryKey: ['medicationList', nickname],
    queryFn: fetchMedication,
    staleTime: 0,
  });
};
