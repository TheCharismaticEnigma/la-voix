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

import { Show, SimplifiedEpisode } from '@spotify/web-api-ts-sdk';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import ms from 'ms';
import ShowEpisode from '../components/ShowEpisode';
import ShowHideText from '../components/ShowHideText';
import ShowTag from '../components/ShowTag';
import Wrapper from '../components/Wrapper';
import HttpService from '../services/HttpService';
import InfiniteScroll from 'react-infinite-scroll-component';

const ShowDetailPage = () => {
  const defaultDimension = '250px';
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);

  const httpService = new HttpService<Show>(`/shows/${spotifyQuery.showId}`);

  const { data: show } = useQuery({
    queryKey: ['show', spotifyQuery.showId],
    queryFn: () => {
      return httpService.get().then((show) => {
        return show;
      });
    },
    staleTime: ms('24h'),
    retry: 3,
  });

  const id = show?.id || '';
  const pageSize = 20;

  const {
    data: episodePages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['showEpisodes', id],
    queryFn: ({ pageParam = 1 }) => {
      return new HttpService<SimplifiedEpisode>(`/shows/${id}/episodes`)
        .getAll({
          params: {
            offset: (pageParam - 1) * pageSize, // start index
            limit: pageSize,
          },
        })
        .then((spotifyResponse) => {
          return spotifyResponse;
        });
    },
    getNextPageParam: (previousPage, allPages) => {
      return previousPage.next === null ? undefined : allPages.length + 1;
    },
    staleTime: ms('24h'),
    retry: 3,
  });

  const allEpisodes =
    episodePages?.pages?.reduce((previousEpisodes, currentPage) => {
      previousEpisodes.push(...currentPage.items);
      return [...previousEpisodes];
    }, [] as SimplifiedEpisode[]) || [];

  return (
    <Box
      width={'100%'}
      height={'100%'}
      overflow={'hidden auto'}
      id="wrapperContainer"
    >
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
