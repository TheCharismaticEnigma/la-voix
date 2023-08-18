import { Flex, Text } from '@chakra-ui/react';
import useCachedToken from '../hooks/useCachedToken';
import useSpotifyQueryStore from '../store';
import useTrack from '../hooks/useTrack';

const NowPlayingContent = () => {
  const { error } = useCachedToken();
  if (error) throw error;

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
      <Text>{track?.name}</Text>
      <Text>{track?.id}</Text>
    </Flex>
  );
};

export default NowPlayingContent;
