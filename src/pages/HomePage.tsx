import { Flex, Text } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import useSpotifyQueryStore from '../store';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SpotifyItemsResponse } from '../services/HttpService';
import axios from 'axios';

import { Album, Artist, Playlist, Show, Track } from '@spotify/web-api-ts-sdk';

type SpotifyData = Album | Artist | Playlist | Show | Track;
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

const HomePage = () => {
  const { searchQuery, searchQueryTag } = useSpotifyQueryStore(
    (s) => s.spotifyQuery
  );

  const { data } = useInfiniteQuery({
    queryKey: ['searchQuery', searchQuery, searchQueryTag],
    queryFn: ({ pageParam = 1 }) => {
      return axios
        .get<SearchQueryData>('https://api.spotify.com/v1/search', {
          params: {
            q: searchQuery || 'Closer',
            type: searchQueryTag,
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
      const results = lastPage.data[`${searchQueryTag}s`];
      return results.next === null ? undefined : allPages.length + 1;
    },
  });

  console.log(data);

  const results: SpotifyData[] =
    data?.pages.reduce((previousData, currentPage) => {
      const currentData = currentPage.data[`${searchQueryTag}s`].items;
      return [...previousData, ...currentData];
    }, [] as SpotifyData[]) || [];

  return (
    <Wrapper>
      <Flex
        background={'gray.700'}
        minH={'100%'}
        width={'100%'}
        borderRadius={'10px '}
        padding={'8px 12px'}
        direction={'column'}
        gap={'1rem '}
      >
        {results.map((result) => (
          <Flex
            width={'100%'}
            fontSize={'2rem'}
            gap={'1rem'}
            direction={'column'}
            key={result.id}
            placeItems={'center'}
          >
            <Text>{result.name}</Text>
            <Text>{result.type}</Text>
          </Flex>
        ))}
      </Flex>
    </Wrapper>
  );
};

export default HomePage;

// For Components => gray.700
