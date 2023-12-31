import { Box, Flex, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import useSpotifyQueryStore from '../store';

import placeholderImage from '../assets/no-image-placeholder.webp';
import AlbumDetailBadge from '../components/AlbumDetailBadge';
import PlaylistedTrackList from '../components/PlaylistedTrackList';
import Wrapper from '../components/Wrapper';
import usePlaylist from '../hooks/usePlaylist';
import FullPageSkeleton from '../skeletons/FullPageSkeleton';

const PlaylistDetailPage = () => {
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);
  const {
    data: playlist,
    isLoading,
    error,
  } = usePlaylist(spotifyQuery.playlistId || '0vx0MnDaQcgxNRqXQZ9FYR');

  if (error) return null;

  const defaultDimension = '250px';

  return (
    <Wrapper>
      {isLoading && <FullPageSkeleton />}

      {!isLoading && (
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
            gap={'0.5rem'}
            padding={'0 5px 0 0 '}
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
                  'linear-gradient(239deg, rgba(36,36,36,1) 40%, rgba(18,18,18,1) 100%)'
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
                    text={`Total Tracks : ${
                      playlist?.tracks.items.length || 0
                    }`}
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
      )}
    </Wrapper>
  );
};

export default PlaylistDetailPage;
