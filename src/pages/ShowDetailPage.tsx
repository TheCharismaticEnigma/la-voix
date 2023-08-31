import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import placeholderImage from '../assets/no-image-placeholder.webp';
import useSpotifyQueryStore from '../store';

import { Episode, Show, SimplifiedEpisode } from '@spotify/web-api-ts-sdk';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import ms from 'ms';
import ShowHideText from '../components/ShowHideText';
import ShowTag from '../components/ShowTag';
import Wrapper from '../components/Wrapper';
import HttpService from '../services/HttpService';

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
    queryFn: ({ pageParam = 2 }) => {
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
      return [...previousEpisodes, ...currentPage.items];
    }, [] as SimplifiedEpisode[]) || [];

  return (
    <Wrapper>
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
            <Flex as={'ul'} width={'100% '} direction={'column'}>
              {allEpisodes?.map((episode) => (
                <Grid
                  key={episode.id}
                  borderTop={'0.5px solid gray'}
                  borderBottom={'0.5px solid gray'}
                  as={'li'}
                  gridTemplateColumns={'125px 1fr'}
                  gap={'1.5rem'}
                  padding={'20px 15px '}
                  cursor={'pointer'}
                  _hover={{
                    background: `linear-gradient(167deg, rgba(164,52,52,1) 0%, rgba(39,28,28,1) 48%, rgba(0,0,0,1) 100%)`,
                    borderColor: 'transparent',
                    borderRadius: '5px',
                  }}
                >
                  <GridItem alignSelf={'center'}>
                    <Box
                      borderRadius={'5px'}
                      overflow={'hidden'}
                      h={'125px'}
                      w={'125px'}
                    >
                      <Image
                        objectFit={'cover'}
                        w={'100%'}
                        h={'100%'}
                        src={episode?.images[0].url || placeholderImage}
                      />
                    </Box>
                  </GridItem>

                  <GridItem alignSelf={'center'} height={'100%'}>
                    <Flex
                      height={'100% '}
                      padding={' 5px '}
                      direction={'column'}
                      justifyContent={'space-around'}
                      gap={'1rem'}
                    >
                      <Text color={'gray.200'} fontSize={'2rem'}>
                        {episode?.name}
                      </Text>
                      <Flex gap={'2rem '}>
                        <ShowTag tagText={`${ms(episode?.duration_ms || 0)}`} />
                        <ShowTag
                          tagText={`Released On : ${episode?.release_date}`}
                        />
                      </Flex>
                    </Flex>
                  </GridItem>
                </Grid>
              ))}
            </Flex>
          )}

          <Button
            margin={'0 auto '}
            width={'fit-content'}
            disabled={hasNextPage && !hasNextPage ? true : false}
            onClick={() => {
              fetchNextPage();
            }}
            mt={3}
          >
            Show More
          </Button>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default ShowDetailPage;
