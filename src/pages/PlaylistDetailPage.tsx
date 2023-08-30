import { Flex, Text } from '@chakra-ui/react';
import useSpotifyQueryStore from '../store';

const PlaylistDetailPage = () => {
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);
  return (
    <Flex placeItems={'center'}>
      <Text fontSize={'5rem'}>
        {spotifyQuery.playlistId || 'NO PlAYLIST SELECTED'}
      </Text>
    </Flex>
  );
};

export default PlaylistDetailPage;
