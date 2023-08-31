import { Playlist } from '@spotify/web-api-ts-sdk';
import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import HttpService from '../services/HttpService';

const usePlaylist = (playlistId: string) => {
  const httpService = new HttpService<Playlist>(`playlists/${playlistId}`);

  return useQuery<Playlist, Error>({
    queryKey: ['playlist', playlistId],
    queryFn: () => {
      return httpService.get().then((playlist) => {
        return playlist;
      });
    },
    staleTime: ms('24h'),
    retry: 3,
  });
};

export default usePlaylist;
