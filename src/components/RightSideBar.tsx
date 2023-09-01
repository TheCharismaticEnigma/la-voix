import { Button, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Album } from '../entities/Album';
import useAlbum from '../hooks/useAlbum';
import useArtistAlbums from '../hooks/useArtistAlbums';
import AlbumCardSkeleton from '../skeletons/AlbumCardSkeleton';
import useSpotifyQueryStore from '../store';
import AlbumCard from './AlbumCard';
import Wrapper from './Wrapper';
import initialArtistAlbum from '../initialData/initialArtistAlbum';
import initialAlbum from '../initialData/initialAlbum';

const RightSideBar = () => {
  const { albumId, artistId } = useSpotifyQueryStore((s) => s.spotifyQuery);
  const setSelectedArtistId = useSpotifyQueryStore(
    (s) => s.setSelectedArtistId
  );

  const { data: album, isLoading: albumIsLoading, error } = useAlbum(albumId);

  const {
    data: allAlbumPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useArtistAlbums(artistId);

  const allAlbums =
    allAlbumPages?.pages.reduce((currentAlbums, { items }) => {
      currentAlbums.push(...items);
      return [...currentAlbums];
    }, [] as Album[]) || [];

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

        <Flex
          direction={'column'}
          borderRadius={'10px'}
          width={'100%'}
          gap={'1rem'}
        >
          <Stack
            background={'gray.700'}
            borderRadius={'inherit'}
            padding={'8px 10px'}
            spacing={3}
          >
            <Heading fontFamily={'system'} size={'xl'} color={'whiteAlpha.600'}>
              Other Related Albums
            </Heading>
            <Divider />
          </Stack>

          <Flex
            direction={'column'}
            alignItems={'center'}
            height={'100%'}
            gap={'1rem'}
          >
            {isLoading &&
              skeletons.map((skeleton) => <AlbumCardSkeleton key={skeleton} />)}

            {!isLoading &&
              allAlbums?.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}

            {hasNextPage && (
              <Button
                m={'1rem 0'}
                size={'lg'}
                onClick={() => {
                  fetchNextPage();
                }}
              >
                SHOW MORE
              </Button>
            )}
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
