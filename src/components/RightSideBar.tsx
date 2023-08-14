import useSpotifyQueryStore from '../store';
import Wrapper from './Wrapper';
import { Flex } from '@chakra-ui/react';

const RightSideBar = () => {
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);

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
          {spotifyQuery.trackId}
        </Flex>

        <Flex
          border={'0.5px solid tomato'}
          background={'gray.700'}
          borderRadius={'10px'}
          width={'100%'}
          padding={'5px 10px'}
        >
          {spotifyQuery.albumId}
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default RightSideBar;

/* Page contains the intricate details regarding the Albums, Artists for the track
that's currently playing
*/
