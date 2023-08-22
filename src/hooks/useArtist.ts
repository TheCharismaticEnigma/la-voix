import { useQuery } from '@tanstack/react-query';
import staleTime from '../utils/staleTime';
import HttpService from '../services/HttpService';
import { Artist } from '../entities/Artist';

const useArtist = (artistId: string) => {
  const httpService = new HttpService<Artist>(`/artists/${artistId}`);

  return useQuery<Artist, Error>({
    queryKey: ['artistDetails', artistId],
    queryFn: () => {
      return httpService.get().then((artist) => {
        return artist;
      });
    },
    staleTime: staleTime('24h'),
    retry: 3,
  });
};

export default useArtist;
