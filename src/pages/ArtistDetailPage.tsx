import { Box, Spinner, Text } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import useAccessToken from '../hooks/useAccessToken';
import useTopArtistTracks from '../hooks/useTopArtistTracks';
import useSpotifyQueryStore from '../store';
import useArtist from '../hooks/useArtist';

const ArtistDetailPage = () => {
  const { spotifyQuery } = useSpotifyQueryStore();
  const accessToken = useAccessToken();

  const {
    data: artist,
    isLoading,
    error,
  } = useArtist(spotifyQuery.artistId, accessToken!);

  if (error) throw error;

  const { data, error: trackError } = useTopArtistTracks(
    spotifyQuery.artistId,
    accessToken!
  );

  console.log(data);

  if (trackError) throw trackError;

  return (
    <>
      <Wrapper>
        {isLoading && (
          <Spinner
            size={'xl'}
            transform={'translate(-50%,-50%)'}
            margin={'50%'}
          />
        )}
        <Box
          background={'gray.700'}
          minH={'100%'}
          height={'fit-content'}
          borderRadius={'10px '}
          padding={'8px 12px'}
        >
          <Text>{spotifyQuery.artistId}</Text>
          <Text>{artist?.name}</Text>
          <Text>{artist?.followers?.total}</Text>
        </Box>
      </Wrapper>
    </>
  );
};

export default ArtistDetailPage;
