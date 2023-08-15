import { useQuery } from '@tanstack/react-query';
import HttpService from '../services/HttpService';
import { Album } from '../entities/Album';
import staleTime from '../utils/staleTime';
import album from '../initialData/initialAlbum';

const useAlbum = (albumId: string, accessToken: string) => {
  const httpService = new HttpService<Album>(`/albums/${albumId}`, accessToken);

  return useQuery({
    queryKey: ['album', albumId], // anytime albumId changes, queryFn is called.
    queryFn: () => {
      return httpService.get().then((album) => {
        return album;
      });
    },
    retry: 3,
    staleTime: staleTime('1h'), // time after which data is considered STALE
    placeholderData: album,
  });
};

export default useAlbum;
