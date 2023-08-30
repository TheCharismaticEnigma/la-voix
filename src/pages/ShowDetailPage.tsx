import { Flex, Text } from '@chakra-ui/react';
import useSpotifyQueryStore from '../store';

const ShowDetailPage = () => {
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);

  return (
    <Flex placeItems={'center'}>
      <Text fontSize={'5rem'}>{spotifyQuery.showId || 'NO SHOW SELECTED'}</Text>
    </Flex>
  );
};

export default ShowDetailPage;
