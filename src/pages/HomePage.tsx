import { Grid, GridItem } from '@chakra-ui/react';
import { Album, Artist, Playlist, Show, Track } from '@spotify/web-api-ts-sdk';
import InfiniteScroll from 'react-infinite-scroll-component';
import QueryCard from '../components/QueryCard';
import useSearchResults from '../hooks/useSearchResults';
import useSpotifyQueryStore from '../store';
import HomePageSkeleton from '../skeletons/HomePageSkeleton';

export type SpotifyData = Album | Artist | Playlist | Show | Track;

const HomePage = () => {
  const { searchQuery, searchQueryTag } = useSpotifyQueryStore(
    (s) => s.spotifyQuery
  );

  const query = searchQuery || 'Closer';
  const queryTag = searchQueryTag || 'track';

  const { data, fetchNextPage, hasNextPage, isLoading } = useSearchResults(
    query,
    queryTag
  );

  const results: SpotifyData[] =
    data?.pages.reduce((previousData, currentPage) => {
      const currentData = currentPage.data[`${queryTag}s`].items;
      return [...previousData, ...currentData];
    }, [] as SpotifyData[]) || [];

  // console.log(results);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <InfiniteScroll
      height={'100vh'}
      dataLength={results?.length ?? 0} //This is important field to render the next data
      next={() => {
        // dataLength takes the value of total components fetched so far.
        fetchNextPage();
      }}
      hasMore={!!hasNextPage}
      scrollThreshold={0.8}
      loader={
        <p
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            margin: '1.5rem auto',
            color: 'gray.500',
          }}
        >
          Loading...
        </p>
      }
    >
      <Grid
        id="scrollableDiv"
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
        {isLoading &&
          skeletons.map((skeleton) => {
            return (
              <GridItem
                key={skeleton}
                as={'li'}
                minH={'30rem'}
                width={'100%'}
                borderRadius={'10px'}
                background={'gray.700'}
              >
                <HomePageSkeleton />
              </GridItem>
            );
          })}

        {!isLoading &&
          results.map((result) => (
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
    </InfiniteScroll>
  );
};

export default HomePage;

// For Components => gray.700
