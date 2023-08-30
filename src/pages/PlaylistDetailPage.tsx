import { Box, Flex, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import useSpotifyQueryStore from '../store';

import { Playlist } from '@spotify/web-api-ts-sdk';
import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import placeholderImage from '../assets/no-image-placeholder.webp';
import AlbumDetailBadge from '../components/AlbumDetailBadge';
import PlaylistedTrackList from '../components/PlaylistedTrackList';
import Wrapper from '../components/Wrapper';
import HttpService from '../services/HttpService';

const PlaylistDetailPage = () => {
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);

  const defaultDimension = '250px';

  const httpService = new HttpService<Playlist>(
    `playlists/${spotifyQuery.playlistId}`
  );

  const { data: playlist } = useQuery<Playlist, Error>({
    queryKey: ['playlist', spotifyQuery.playlistId],
    queryFn: () => {
      return httpService.get().then((playlist) => {
        console.log(playlist);
        return playlist;
      });
    },
    staleTime: ms('24h'),
    retry: 3,
  });

  return (
    <Wrapper>
      <Flex
        background={'gray.700'}
        minH={'100%'}
        height={'fit-content'}
        borderRadius={'10px '}
        direction={'column'}
        gap={'1rem'}
        alignItems={'center'}
        padding={'8px'}
      >
        {/* GRID and TRACK LIST */}
        <Grid
          borderRadius={'inherit'}
          width={'100%'}
          gap={'1rem'}
          gridTemplateRows={'repeat(1, max(fit-content, 320px))'}
          gridTemplateColumns={'auto 1fr'}
          alignItems={'center'}
        >
          <GridItem>
            <Box
              borderRadius={'5px'}
              width={defaultDimension}
              overflow={'hidden'}
              boxShadow={'0px 0px 5px #262626 '}
            >
              <Image
                width={'100%'}
                height={'100%'}
                objectFit={'cover'}
                borderRadius={'inherit'}
                src={playlist?.images[0].url || placeholderImage}
              />
            </Box>
          </GridItem>
          <GridItem>
            <Flex
              padding={'0 1rem'}
              direction={'column'}
              gap={'2rem'}
              justifyContent={'space-evenly'}
              width={'100%'}
              height={'fit-content'}
              borderRadius={'10px '}
              background={
                'linear-gradient(39deg, rgba(36,36,36,1) 40%, rgba(18,18,18,1) 100%)'
              }
            >
              <Heading fontFamily={'system'} fontSize={'4rem'}>
                {playlist?.name}
              </Heading>
              <Flex
                direction={'column'}
                gap={4}
                flexWrap={'wrap'}
                maxW={'100%'}
                justifyContent={'space-between'}
                padding={'8px 0 '}
              >
                <AlbumDetailBadge
                  text={`Owner : ${playlist?.owner.display_name}`}
                />
                <AlbumDetailBadge
                  text={`Total Tracks : ${playlist?.tracks.items.length || 0}`}
                />
                <AlbumDetailBadge
                  text={`Followers : ${playlist?.followers.total || 0}`}
                />
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
        {playlist?.tracks.items && (
          <PlaylistedTrackList tracks={playlist.tracks.items} />
        )}
      </Flex>
    </Wrapper>
  );
};

export default PlaylistDetailPage;
