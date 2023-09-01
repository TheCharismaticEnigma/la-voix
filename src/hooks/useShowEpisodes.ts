import { SimplifiedEpisode } from '@spotify/web-api-ts-sdk';
import { useInfiniteQuery } from '@tanstack/react-query';
import ms from 'ms';
import HttpService from '../services/HttpService';

const useShowEpisodes = (showId: string) => {
  const pageSize = 20;

  return useInfiniteQuery({
    queryKey: ['showEpisodes', showId],

    queryFn: ({ pageParam = 1 }) => {
      return new HttpService<SimplifiedEpisode>(`/shows/${showId}/episodes`)
        .getAll({
          params: {
            offset: (pageParam - 1) * pageSize, // start index
            limit: pageSize,
          },
        })
        .then((spotifyResponse) => {
          return spotifyResponse;
        });
    },
    getNextPageParam: (previousPage, allPages) => {
      return previousPage.next === null ? undefined : allPages.length + 1;
    },
    staleTime: ms('24h'),
    retry: 3,
  });
};

export default useShowEpisodes;
