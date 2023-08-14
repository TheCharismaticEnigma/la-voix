import { Flex } from '@chakra-ui/react';
import useAccessToken from '../hooks/useAccessToken';
import useAlbum from '../hooks/useAlbum';
import useSpotifyQueryStore from '../store';
import AlbumCard from './AlbumCard';
import Wrapper from './Wrapper';
import AlbumCardSkeleton from './AlbumCardSkeleton';

const RightSideBar = () => {
  const token = useAccessToken();
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);

  const {
    data: album,
    error: albumError,
    isLoading,
  } = useAlbum(spotifyQuery.albumId, token!);

  if (albumError) throw albumError;

  console.log(album);

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
