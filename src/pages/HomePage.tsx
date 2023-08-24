import { Grid, GridItem } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import { Album, Artist, Playlist, Show, Track } from '@spotify/web-api-ts-sdk';
import QueryCard from '../components/QueryCard';
import useSearchResults from '../hooks/useSearchResults';
import useSpotifyQueryStore from '../store';

export type SpotifyData = Album | Artist | Playlist | Show | Track;

const HomePage = () => {
  const { searchQuery, searchQueryTag } = useSpotifyQueryStore(
    (s) => s.spotifyQuery
  );

  const query = searchQuery || 'Closer';
  const queryTag = searchQueryTag || 'track';

  const { data } = useSearchResults(query, queryTag);

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
        columnGap={5}
        background={'gray.700'}
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
