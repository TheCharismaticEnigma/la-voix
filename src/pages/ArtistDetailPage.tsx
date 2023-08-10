import { Box } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';

const ArtistDetailPage = () => {
  return (
    <Wrapper>
      <Box background={'gray.700'} minH={'100%'}>
        Most people don't cheer for themselves. They don't even believe in
        themselves. Why would they do it for me?
      </Box>
    </Wrapper>
  );
};

export default ArtistDetailPage;
