import { useQuery } from '@tanstack/react-query';
import staleTime from '../utils/staleTime';
import HttpService from '../services/HttpService';
import { Track } from '../entities/Track';
import topTracks from '../initialData/initialArtistTopTracks';

const useTopArtistTracks = (artistId: string) => {
  const httpService = new HttpService<Track>(`artists/${artistId}/top-tracks`);

  return useQuery({
    queryKey: ['top-tracks', artistId],
    queryFn: () => {
      return httpService.getAll().then((tracks) => {
        return tracks.tracks;
      });
    },
    staleTime: staleTime('1h'),
    retry: 3,
    placeholderData: topTracks,
  });
};

export default useTopArtistTracks;

/* 
Anytime the artistId in the key changes, data is refetched. 
 All the functionality of calling within the effect hook,  cancelling requests, errors, isLoading, caching, refetching,
  is implemented in react query.
*/
