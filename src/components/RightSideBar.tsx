import { Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useAlbum from '../hooks/useAlbum';
import initialAlbum from '../initialData/initialAlbum';
import AlbumCardSkeleton from '../skeletons/AlbumCardSkeleton';
import useSpotifyQueryStore from '../store';
import AlbumCard from './AlbumCard';
import RelatedAlbums from './RelatedAlbums';
import Wrapper from './Wrapper';

const RightSideBar = () => {
  const { albumId } = useSpotifyQueryStore((s) => s.spotifyQuery);

  const setSelectedArtistId = useSpotifyQueryStore(
    (s) => s.setSelectedArtistId
  );

  const { data: album, isLoading: albumIsLoading, error } = useAlbum(albumId);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Wrapper>
      <Flex
        width={'100%'}
        paddingRight={'5px '}
        borderRadius={'10px '}
        borderTopRightRadius={'0'}
        minH={'100%'}
        direction={'column'}
        gap={'2rem'}
      >
        {albumIsLoading &&
          skeletons
            .slice(-3)
            .map((skeleton) => <AlbumCardSkeleton key={skeleton} />)}

        {!albumIsLoading && <AlbumCard album={album || initialAlbum} />}

        {error && <AlbumCard album={initialAlbum} />}

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
                <Link key={id} to={`/artist/${id}`}>
                  <Text
                    onClick={() => {
                      setSelectedArtistId(id);
                    }}
                    cursor={'pointer'}
                    fontSize={'2rem'}
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

        <RelatedAlbums />
      </Flex>
    </Wrapper>
  );
};

export default RightSideBar;

/* 
Page contains the intricate details regarding the Albums, Artists for the track
that's currently playing 
*/
