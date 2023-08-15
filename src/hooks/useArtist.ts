import { useQuery } from '@tanstack/react-query';
import staleTime from '../utils/staleTime';
import HttpService from '../services/HttpService';
import { Artist } from '../entities/Artist';
import initialArtist from '../initialData/initialArtist';

const useArtist = (artistId: string, accessToken: string) => {
  const httpService = new HttpService<Artist>(
    `/artists/${artistId}`,
    accessToken
  );

  return useQuery<Artist, Error>({
    queryKey: ['artistDetails', artistId],
    queryFn: () => {
      return httpService.get().then((artist) => {
        return artist;
      });
    },
    staleTime: staleTime('1h'),
    retry: 3,
    placeholderData: initialArtist,
  });
};

export default useArtist;
