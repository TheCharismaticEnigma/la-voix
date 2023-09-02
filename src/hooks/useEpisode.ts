import { Episode } from '@spotify/web-api-ts-sdk';
import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import HttpService from '../services/HttpService';

const useEpisode = (episodeId: string) => {
  const episodeService = new HttpService<Episode>(`/episodes/${episodeId}`);

  return useQuery({
    queryKey: ['episode', episodeId],
    queryFn: () => {
      return episodeService.get().then((episode) => {
        return episode;
      });
    },
    staleTime: ms('24h'),
    retry: 3,
  });
};

export default useEpisode;
