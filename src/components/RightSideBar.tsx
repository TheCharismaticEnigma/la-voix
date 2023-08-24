import { Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { Album } from '../entities/Album';
import useAlbum from '../hooks/useAlbum';
import useArtistAlbums from '../hooks/useArtistAlbums';
import useSpotifyQueryStore from '../store';
import AlbumCard from './AlbumCard';
import AlbumCardSkeleton from './AlbumCardSkeleton';
import Wrapper from './Wrapper';

const RightSideBar = () => {
  // const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);
  // const setSelectedArtistId = useSpotifyQueryStore(
  //   (s) => s.setSelectedArtistId
  // );

  const { spotifyQuery, setSelectedArtistId } = useSpotifyQueryStore();

  const { data: album } = useAlbum(spotifyQuery.albumId!);

  const {
    data: allAlbumPages,
    fetchNextPage,
    hasNextPage,
  } = useArtistAlbums(spotifyQuery.artistId || '');

  const allAlbums =
    allAlbumPages?.pages.reduce((currentAlbums, { items }) => {
      return [...currentAlbums, ...items];
    }, [] as Album[]) || [];

  return (
    <Wrapper>
      <Flex
        paddingRight={'5px '}
        borderRadius={'10px '}
        borderTopRightRadius={'0'}
        minH={'100%'}
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
              Other Albums
            </Heading>
            <Divider />
          </Stack>

          {allAlbums?.length > 0 && (
            <InfiniteScroll
              dataLength={allAlbums?.length ?? 0} //This is important field to render the next data
              next={() => {
                // dataLength takes the value of total components fetched so far.
                fetchNextPage();
              }}
              hasMore={hasNextPage ? hasNextPage : false}
              scrollThreshold={0.8}
              loader={<AlbumCardSkeleton />}
              endMessage={<Divider />}
            >
              <Flex direction={'column'} height={'fit-content'} gap={'1rem'}>
                {allAlbums?.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </Flex>
            </InfiniteScroll>
          )}
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
