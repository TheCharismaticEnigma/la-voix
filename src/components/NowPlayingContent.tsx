import { Box, Flex, Grid, GridItem, Text, Image } from '@chakra-ui/react';
import useTrack from '../hooks/useTrack';
import useSpotifyQueryStore from '../store';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NowPlayingContent = () => {
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);
  const setSelectedArtistId = useSpotifyQueryStore(
    (s) => s.setSelectedArtistId
  );

  const { data: track } = useTrack(spotifyQuery.trackId);

  useEffect(() => {
    // Set the Initial Volume of Audio Element at 40%
    const audioEl = document.getElementById('audioElement') as HTMLAudioElement;
    audioEl.volume = 0.4;
  }, []);

  return (
    <Grid
      padding={'5px  0 '}
      alignItems={'center'}
      gridTemplateColumns={'repeat(3,1fr)'}
      width={'100%'}
      gap={'2rem'}
      fontSize={'1.5rem'}
    >
      {/* <Text>{track?.name}</Text>
          <Text>{track?.id}</Text> */}

      <GridItem height={'100%'}>
        <Flex
          height={'100%'}
          padding={'3px 10px'}
          width={'fit-content'}
          placeItems={'center'}
          gap={'2rem '}
        >
          <Box borderRadius={'1rem'} width={'5rem'} height={'100%'}>
            <Image
              borderRadius={'inherit'}
              objectFit={'cover'}
              src={track?.album.images[0].url}
            />
          </Box>
          <Flex direction="column" justifyContent={'center'}>
            <Text fontWeight={'600'} fontSize={'1.6rem '}>
              {track?.name}
            </Text>
            {track?.artists[0].id && (
              <Link
                to={`/artist/${track.artists[0].id}`}
                onClick={() => {
                  setSelectedArtistId(track.artists[0].id);
                }}
              >
                <Text
                  _hover={{ textDecoration: 'underline' }}
                  fontSize={'1.4rem'}
                >
                  {track.artists[0].name}
                </Text>
              </Link>
            )}
          </Flex>
        </Flex>
      </GridItem>

      <GridItem
        colSpan={2}
        display={'flex'}
        placeContent={'center'}
        padding={'0 2rem'}
      >
        <audio
          id="audioElement"
          src={`${track?.preview_url}`}
          typeof="audio/mpeg"
          controls
        >
          This track isn't available at the moment.
        </audio>
      </GridItem>
    </Grid>
  );
};

export default NowPlayingContent;
