import { Divider, Flex, Text, Heading } from '@chakra-ui/react';
import useAccessToken from '../hooks/useAccessToken';
import useAlbum from '../hooks/useAlbum';
import useSpotifyQueryStore from '../store';
import AlbumCard from './AlbumCard';
import Wrapper from './Wrapper';
import { Link } from 'react-router-dom';

const RightSideBar = () => {
  const { data: token, error: tokenError } = useAccessToken();

  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);
  const setSelectedArtistId = useSpotifyQueryStore(
    (s) => s.setSelectedArtistId
  );

  if (tokenError) throw tokenError;

  const { data: album } = useAlbum(spotifyQuery.albumId!, token!);
  console.log(album?.artists);

  return (
    <Wrapper>
      <Flex
        paddingRight={'5px '}
        borderRadius={'10px '}
        borderTopRightRadius={'0'}
        minH={'1020%'}
        direction={'column'}
        gap={'2rem'}
      >
        <AlbumCard album={album!} />

        <Flex
          background={'gray.700'}
          borderRadius={'10px'}
          width={'100%'}
          padding={'8px 10px'}
          gap={'1rem'}
          direction={'column'}
        >
          <Heading fontFamily={'system'} size={'xl'} color={'whiteAlpha.600'}>
            Album Artists
          </Heading>

          <Divider />
          <Flex flexWrap={'wrap'} gap={'1.5rem'}>
            {album?.artists.map(({ id, name }) => {
              return (
                <Link to={`/artist/${id}`}>
                  <Text
                    onClick={() => {
                      setSelectedArtistId(id);
                    }}
                    cursor={'pointer'}
                    fontSize={'2rem'}
                    key={id}
                    _hover={{ color: 'white', textDecoration: 'underline' }}
                  >
                    {name}
                    {','}
                  </Text>
                </Link>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default RightSideBar;

/* 
Page contains the intricate details regarding the Albums, Artists for the track
that's currently playing 
*/
