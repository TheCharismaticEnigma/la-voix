import { Flex } from '@chakra-ui/react';
import useAccessToken from '../hooks/useAccessToken';
import useAlbum from '../hooks/useAlbum';
import useSpotifyQueryStore from '../store';
import AlbumCard from './AlbumCard';
import Wrapper from './Wrapper';
import AlbumCardSkeleton from './AlbumCardSkeleton';

const RightSideBar = () => {
  const { data: token, error: tokenError } = useAccessToken();
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);

  if (tokenError) throw tokenError;

  const { data: album, isLoading } = useAlbum(spotifyQuery.albumId!, token!);

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
        {isLoading && <AlbumCardSkeleton />}
        <AlbumCard album={album!} />
      </Flex>
    </Wrapper>
  );
};

export default RightSideBar;

/* 
Page contains the intricate details regarding the Albums, Artists for the track
that's currently playing 
*/
