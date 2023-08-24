import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SpotifyData } from '../pages/HomePage';
import { SpotifyItemsResponse } from '../services/HttpService';

interface SearchQueryData {
  /*
  albums?: SpotifyItemsResponse<Album>;
  tracks?: SpotifyItemsResponse<Track>;
  playlists?: SpotifyItemsResponse<Playlist>;
  artists?: SpotifyItemsResponse<Artist>;
  shows?: SpotifyItemsResponse<Show>;
  */

  [queryTag: string]: SpotifyItemsResponse<SpotifyData>;
}

const useSearchResults = (query: string, queryTag: string) => {
  return useInfiniteQuery({
    queryKey: ['searchQuery', query, queryTag],
    queryFn: ({ pageParam = 1 }) => {
      return axios
        .get<SearchQueryData>('https://api.spotify.com/v1/search', {
          params: {
            q: query,
            type: queryTag,
            market: 'IN',
            offset: (pageParam - 1) * 50,
            limit: 50,
            include_external: 'audio',
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          return res;
        });
    },

    getNextPageParam: (lastPage, allPages) => {
      const results = lastPage.data[`${queryTag}s`];
      return results.next === null ? undefined : allPages.length + 1;
    },
  });
};

export default useSearchResults;
