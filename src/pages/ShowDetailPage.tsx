import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
} from '@chakra-ui/react';
import placeholderImage from '../assets/no-image-placeholder.webp';
import useSpotifyQueryStore from '../store';

import { SimplifiedEpisode } from '@spotify/web-api-ts-sdk';
import InfiniteScroll from 'react-infinite-scroll-component';
import ShowEpisode from '../components/ShowEpisode';
import ShowHideText from '../components/ShowHideText';
import ShowTag from '../components/ShowTag';
import useShow from '../hooks/useShow';
import useShowEpisodes from '../hooks/useShowEpisodes';
import FullPageSkeleton from '../skeletons/FullPageSkeleton';

const ShowDetailPage = () => {
  const defaultDimension = '250px';
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);
  const showId = spotifyQuery.showId || '4rOoJ6Egrf8K2IrywzwOMk';

  const { data: show, isLoading: showIsLoading } = useShow(showId);

  const {
    data: episodePages,
    fetchNextPage,
    hasNextPage,
    isLoading: episodesAreLoading,
  } = useShowEpisodes(showId);

  const allEpisodes =
    episodePages?.pages?.reduce((previousEpisodes, currentPage) => {
      previousEpisodes.push(...currentPage.items);
      return [...previousEpisodes];
    }, [] as SimplifiedEpisode[]) || [];

  return (
    <Box
      id="wrapperContainer"
      width={'100%'}
      height={'100%'}
      overflow={'hidden auto'}
    >
      {(episodesAreLoading || showIsLoading) && <FullPageSkeleton />}

      <Flex
        background={'gray.700'}
        borderRadius={'10px '}
        padding={'8px'}
        width={'100%'}
        direction={'column'}
        gap={'1.5rem'}
      >
        <Grid
          height={'fit-content'}
          borderRadius={'1rem'}
          gap={'1rem'}
          gridTemplateColumns={'255px 1fr'}
          background={
            'linear-gradient(90deg, rgba(38,38,38,1) 0%, rgba(20,28,28) 37%, rgba(38,38,38,1) 100%)'
          }
        >
          <GridItem
            alignSelf={'center'}
            display={'flex'}
            placeContent={'center'}
          >
            <Box
              borderRadius={'1rem'}
              height={defaultDimension}
              width={defaultDimension}
              overflow={'hidden'}
            >
              <Image
                objectFit={'cover'}
                width={'100%'}
                height={'100%'}
                src={show?.images[0].url || placeholderImage}
              />
            </Box>
          </GridItem>

          <GridItem alignSelf={'center'}>
            <Flex
              padding={'5px '}
              direction={'column'}
              gap={'1rem'}
              height={'fit-content'}
            >
              <Heading
                color={'gray.300'}
                fontFamily={'system'}
                fontSize={'4rem'}
              >
                {show?.name}
              </Heading>

              <ShowTag tagText={`By - ${show?.publisher}`} />
              <ShowTag tagText={`${show?.episodes.total} Episodes`} />
            </Flex>
          </GridItem>
        </Grid>
        <Flex
          direction={'column'}
          borderRadius={'10px'}
          padding={'12px 8px '}
          background={'rgba(38,38,38,0.5)'}
        >
          <Heading fontFamily={'system'} size={'2xl'} as="h3" mb={'1rem'}>
            ABOUT
          </Heading>

          <ShowHideText text={show?.description} />
        </Flex>

        <Flex
          padding={'8px '}
          borderRadius={'inherit'}
          background={'gray.800'}
          width={'100%'}
          direction={'column'}
          gap={'1.5rem'}
        >
          <Heading
            padding={' 0 15px '}
            m={'1rem 0 0.5rem '}
            size={'3xl'}
            fontFamily={'system'}
          >
            All Episodes
          </Heading>

          {allEpisodes && (
            <InfiniteScroll
              dataLength={allEpisodes.length}
              scrollableTarget="wrapperContainer"
              scrollThreshold={0.7}
              next={() => {
                fetchNextPage();
              }}
              hasMore={!!hasNextPage}
              loader={
                <Flex mt={5} justifyContent={'center'} width={'100%'}>
                  <Button
                    width={'fit-content'}
                    pointerEvents={'none'}
                    fontSize={'1.6rem'}
                    padding={'1em 8px'}
                  >
                    Loading..
                  </Button>
                </Flex>
              }
            >
              <Flex
                as={'ul'}
                width={'100% '}
                direction={'column'}
                justifyContent={'center'}
              >
                {allEpisodes?.map((episode) => (
                  <ShowEpisode episode={episode} key={episode.id} />
                ))}
              </Flex>
            </InfiniteScroll>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ShowDetailPage;
