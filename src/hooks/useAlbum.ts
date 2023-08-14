import { useQuery } from '@tanstack/react-query';
import HttpService from '../services/HttpService';
import { Album } from '../entities/Album';
import staleTime from '../utils/staleTime';

const useAlbum = (albumId: string, accessToken: string) => {
  const httpService = new HttpService<Album>(`/albums/${albumId}`, accessToken);

  return useQuery({
    queryKey: ['album', albumId], // anytime albumId changes, queryFn is called.
    queryFn: () => {
      return httpService.get().then((album) => {
        return album;
      });
    },
    staleTime: staleTime('1h'),
    retry: 3,
  });
};

export default useAlbum;
