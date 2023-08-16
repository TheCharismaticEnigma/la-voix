import { useInfiniteQuery } from '@tanstack/react-query';
import HttpService from '../services/HttpService';
import { Album } from '../entities/Album';
import staleTime from '../utils/staleTime';

const useArtistAlbums = (artistId: string) => {
  const httpService = new HttpService<Album>(`/artists/${artistId}/albums`);

  /*
  return useQuery({
    queryKey: ['artistsAlbums', artistId],
    queryFn: () => {
      return httpService.getAll().then((albums) => {
        console.log(albums);
        return albums;
      });
    },
    staleTime: staleTime('1h'),
    retry: 3,
  });
  */
  const pageSize = 50;

  return useInfiniteQuery({
    queryKey: ['artistsAlbums', artistId],

    queryFn: ({ pageParam = 1 }) => {
      return httpService
        .getArtistsAlbums({
          params: {
            offset: (pageParam - 1) * pageSize, // start index
            limit: pageSize,
          },
        })
        .then((spotifyResponse) => spotifyResponse);
    },

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next === null ? undefined : allPages.length + 1;
    },

    staleTime: staleTime('24h'),
    retry: 3,
  });
};

export default useArtistAlbums;

// Returns all the albums from an artist.
// Use Infinite Query here.
// Wrap element with React Infinite Query Component.
