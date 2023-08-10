import { Box, Text } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import useSpotifyQueryStore from '../store';

const ArtistDetailPage = () => {
  const spotifyQuery = useSpotifyQueryStore(
    (selector) => selector.spotifyQuery
  );

  return (
    <>
      <Wrapper>
        <Box
          background={'gray.700'}
          minH={'100%'}
          height={'fit-content'}
          borderRadius={'10px '}
          padding={'8px 12px'}
        >
          <Text> {spotifyQuery.artistId}</Text>
        </Box>
      </Wrapper>
    </>
  );
};

export default ArtistDetailPage;
