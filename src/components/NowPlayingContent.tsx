import { Flex } from '@chakra-ui/react';
import useCachedToken from '../hooks/useCachedToken';
import useTrack from '../hooks/useTrack';
import useSpotifyQueryStore from '../store';
import { handleExpiredTokenError } from '../services/HttpService';

const NowPlayingContent = () => {
  const { error } = useCachedToken();
  if (error) throw error;

  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);

  const { data: track, error: trackError } = useTrack(spotifyQuery.trackId);

  if (trackError) handleExpiredTokenError(trackError);
  // console.log(track);

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
