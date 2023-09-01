import { Show } from '@spotify/web-api-ts-sdk';
import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import HttpService from '../services/HttpService';

const useShow = (showId: string) => {
  const httpService = new HttpService<Show>(`/shows/${showId}`);

  return useQuery({
    queryKey: ['show', showId],
    queryFn: () => {
      return httpService.get().then((show) => {
        return show;
      });
    },
    staleTime: ms('24h'),
    retry: 3,
  });
};

export default useShow;
