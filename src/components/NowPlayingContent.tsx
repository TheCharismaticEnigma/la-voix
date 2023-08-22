import { Flex } from '@chakra-ui/react';
import useTrack from '../hooks/useTrack';
import useSpotifyQueryStore from '../store';

const NowPlayingContent = () => {
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);

  const { data: track } = useTrack(spotifyQuery.trackId);

  return (
    <Flex
      alignItems={'center'}
      width={'100%'}
      direction={'column'}
      gap={'2rem'}
      fontSize={'1.5rem'}
    >
      {/* <Text>{track?.name}</Text>
          <Text>{track?.id}</Text> */}

      <audio src={`${track?.preview_url}`} typeof="audio/mpeg" controls>
        This track isn't available at the moment.
      </audio>
    </Flex>
  );
};

export default NowPlayingContent;
