import { useUserStore } from '@/entities/user/model/store';
import { useEffect } from 'react';

export const useLoadState = () => {
  const { fetchUser } = useUserStore((state) => ({
    fetchUser: state.fetchUser,
  }));

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, [fetchUser]);
};
