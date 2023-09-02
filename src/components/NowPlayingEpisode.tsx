import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import useEpisode from '../hooks/useEpisode';
import useSpotifyQueryStore from '../store';

const NowPlayingEpisode = () => {
  const { episodeId } = useSpotifyQueryStore((s) => s.spotifyQuery);
  const { data: episode } = useEpisode(episodeId!);

  useEffect(() => {
    // Set the Initial Volume of Audio Element at 40%
    const audioEl: HTMLAudioElement | null = document.getElementById(
      'audioElement'
    ) as HTMLAudioElement;

    if (audioEl) audioEl.volume = 0.4;
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
              src={episode?.images[0].url}
            />
          </Box>
          <Flex direction="column" justifyContent={'center'}>
            <Text fontWeight={'600'} fontSize={'1.6rem '}>
              {episode?.name}
            </Text>
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
          src={`${episode?.audio_preview_url}`}
          typeof="audio/mpeg"
          controls
        >
          This Episode isn't available at the moment.
        </audio>
      </GridItem>
    </Grid>
  );
};

export default NowPlayingEpisode;
