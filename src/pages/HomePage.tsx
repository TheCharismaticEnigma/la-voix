import { Grid, GridItem } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Wrapper from '../components/Wrapper';
import { SpotifyItemsResponse } from '../services/HttpService';
import useSpotifyQueryStore from '../store';

import { Album, Artist, Playlist, Show, Track } from '@spotify/web-api-ts-sdk';
import QueryCard from '../components/QueryCard';

export type SpotifyData = Album | Artist | Playlist | Show | Track;
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

  const query = searchQuery || 'Closer';
  const queryTag = searchQueryTag || 'track';

  const { data } = useInfiniteQuery({
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

  const results: SpotifyData[] =
    data?.pages.reduce((previousData, currentPage) => {
      const currentData = currentPage.data[`${queryTag}s`].items;
      return [...previousData, ...currentData];
    }, [] as SpotifyData[]) || [];

  // console.log(results);

  return (
    <Wrapper>
      <Grid
        as={'ul'}
        padding={'8px '}
        gridTemplateColumns={{
          md: 'repeat(2,1fr)',
          lg: 'repeat(3,1fr)',
          xl: 'repeat(4,1fr)',
        }}
        rowGap={8}
        columnGap={6}
      >
        {results.map((result) => (
          // Check if object implements an interface w/ TYPE PREDICATE.
          <GridItem
            key={result.id}
            as={'li'}
            minH={'30rem'}
            width={'100%'}
            borderRadius={'10px'}
            background={'gray.700'}
          >
            <QueryCard data={result} tag={queryTag} />
          </GridItem>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default HomePage;

// For Components => gray.700
