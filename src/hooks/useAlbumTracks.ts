import { useQuery } from '@tanstack/react-query';
import HttpService from '../services/HttpService';
import { Album } from '../entities/Album';
import staleTime from '../utils/staleTime';

const useAlbumTracks = (albumId: string, accessToken: string) => {
  const httpService = new HttpService<Album>(
    `/albums/${albumId}/tracks`,
    accessToken
  );

  return useQuery({
    queryKey: ['albumTracks', albumId], // anytime albumId changes, queryFn is called.
    queryFn: () => {
      return httpService.getAll().then((album) => {
        return album.items;
      });
    },
    staleTime: staleTime('1h'),
    retry: 3,
  });
};

export default useAlbumTracks;
