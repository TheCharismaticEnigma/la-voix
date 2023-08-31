import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';
import DetailContainer from '../components/DetailContainer';
import TrackList from '../components/TrackList';
import Wrapper from '../components/Wrapper';
import useArtist from '../hooks/useArtist';
import useTopArtistTracks from '../hooks/useTopArtistTracks';
import FullPageSkeleton from '../skeletons/FullPageSkeleton';
import useSpotifyQueryStore from '../store';
import placeholderImage from '../assets/no-image-placeholder.webp';

const ArtistDetailPage = () => {
  const { spotifyQuery } = useSpotifyQueryStore();

  const { data: artist, isLoading } = useArtist(spotifyQuery.artistId);

  const { data: topTracks } = useTopArtistTracks(spotifyQuery.artistId);

  // Instead of throwing errors, have some placeholder data.

  const defaultDimension = '320px';

  return (
    <>
      <Wrapper>
        {isLoading && <FullPageSkeleton />}
        {!isLoading && (
          <Flex
            // background={'gray.700'}
            minH={'100%'}
            height={'fit-content'}
            borderRadius={'10px '}
            direction={'column'}
            gap={'1rem'}
            alignItems={'center'}
            padding={'8px'}
          >
            <Grid
              borderRadius={'inherit'}
              width={'100%'}
              gap={'1.5rem'}
              gridTemplateRows={'repeat(1, max(fit-content, 320px))'}
              gridTemplateColumns={'320px 1fr'}
            >
              <GridItem>
                <Box
                  borderRadius={'10px'}
                  width={artist?.images[1].width || defaultDimension}
                  height={artist?.images[1].height || defaultDimension}
                  overflow={'hidden'}
                  boxShadow={'0px 0px 5px #262626 '}
                >
                  <Image
                    width={'100%'}
                    height={'100%'}
                    objectFit={'cover'}
                    borderRadius={'inherit'}
                    src={artist?.images[0].url || placeholderImage}
                  />
                </Box>
              </GridItem>

              <GridItem>
                <Flex
                  height={'100%'}
                  direction={'column'}
                  fontSize={'2rem '}
                  borderRadius={'10px'}
                  padding={'8px'}
                  gap={'2rem '}
                  justifyContent={'space-evenly'}
                >
                  <Heading
                    textShadow={'0px 0px 10px green '}
                    fontSize={'5.2rem'}
                    fontFamily={'system'}
                  >
                    {artist?.name}
                  </Heading>

                  <Stack gap={'0.5rem'}>
                    <DetailContainer
                      value={`Popularity - ${artist?.popularity} ` || '50'}
                    />

                    <DetailContainer
                      value={
                        `Followers - ${artist?.followers.total} ` || '121212'
                      }
                    />

                    <DetailContainer
                      value={` ${artist?.genres.slice(-2).join(', ')}` || '[]'}
                    />
                  </Stack>

                  {/* <PlayAllContainer /> */}
                </Flex>
              </GridItem>
            </Grid>

            {topTracks && <TrackList tracks={topTracks} />}
          </Flex>
        )}
      </Wrapper>
    </>
  );
};

export default ArtistDetailPage;
