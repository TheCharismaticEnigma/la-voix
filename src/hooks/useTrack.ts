import { useQuery } from '@tanstack/react-query';
import staleTime from '../utils/staleTime';
import HttpService from '../services/HttpService';
import { Track } from '../entities/Track';

const useTrack = (trackId: string) => {
  const httpService = new HttpService<Track>(`/tracks/${trackId}`);

  return useQuery<Track, Error>({
    queryKey: ['track', trackId],
    queryFn: () => {
      return httpService.get().then((track) => track);
    },
    staleTime: staleTime('24h'),
    retry: 3,
  });
};

export default useTrack;
