import { Flex } from '@chakra-ui/react';
import useAccessToken from '../hooks/useAccessToken';
import useAlbum from '../hooks/useAlbum';
import useSpotifyQueryStore from '../store';
import Wrapper from './Wrapper';

const RightSideBar = () => {
  const token = useAccessToken();
  const { spotifyQuery } = useSpotifyQueryStore();

  const { data: album } = useAlbum(spotifyQuery.albumId!, token!);

  return (
    <Wrapper>
      <Flex
        paddingRight={'5px '}
        borderRadius={'10px '}
        borderTopRightRadius={'0'}
        minH={'100%'}
        direction={'column'}
        gap={'1.5rem'}
      >
        <Flex
          border={'0.5px solid tomato'}
          background={'gray.700'}
          borderRadius={'10px'}
          width={'100%'}
          padding={'5px 10px'}
        >
          Gracias a todos.
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default RightSideBar;

/* Page contains the intricate details regarding the Albums, Artists for the track
that's currently playing
*/
