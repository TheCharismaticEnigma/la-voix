import { Flex, Stack, Heading, Divider, Button } from '@chakra-ui/react';
import AlbumCardSkeleton from '../skeletons/AlbumCardSkeleton';
import AlbumCard from './AlbumCard';
import useArtistAlbums from '../hooks/useArtistAlbums';
import { Album } from '../entities/Album';
import useSpotifyQueryStore from '../store';

const RelatedAlbums = () => {
  const { artistId } = useSpotifyQueryStore((s) => s.spotifyQuery);

  const {
    data: allAlbumPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    error,
  } = useArtistAlbums(artistId);

  if (error) return null;

  const allAlbums =
    allAlbumPages?.pages.reduce((currentAlbums, { items }) => {
      currentAlbums.push(...items);
      return [...currentAlbums];
    }, [] as Album[]) || [];

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
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
          allAlbums?.map((album) => <AlbumCard key={album.id} album={album} />)}

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
  );
};

export default RelatedAlbums;
