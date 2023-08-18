import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AlbumDetailBadge from '../components/AlbumDetailBadge';
import TrackList from '../components/TrackList';
import Wrapper from '../components/Wrapper';
import useAlbum from '../hooks/useAlbum';
import useCachedToken from '../hooks/useCachedToken';
import useSpotifyQueryStore from '../store';
import PlayAllContainer from '../components/PlayAllContainer';

const AlbumDetailPage = () => {
  const { error } = useCachedToken();
  if (error) throw error;

  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);
  const setSelectedArtistId = useSpotifyQueryStore(
    (s) => s.setSelectedArtistId
  );

  const { data: album } = useAlbum(spotifyQuery.albumId);

  if (!album) return null;

  const defaultDimension = '280px';

  // (Grid with two columsn and then Flex containers) Flex
  return (
    <Wrapper>
      <Flex
        background={'gray.700'}
        minH={'100%'}
        height={'fit-content'}
        borderRadius={'10px '}
        direction={'column'}
        gap={'1rem'}
        alignItems={'center'}
        padding={'8px'}
      >
        <Grid
          borderRadius={'inherit'}
          width={'100%'}
          gap={'1rem'}
          gridTemplateRows={'repeat(1, max(fit-content, 320px))'}
          gridTemplateColumns={'auto 1fr'}
        >
          <GridItem alignSelf={'center'}>
            <Box
              borderRadius={'5px'}
              width={defaultDimension}
              overflow={'hidden'}
              boxShadow={'0px 0px 5px #262626 '}
            >
              <Image
                width={'100%'}
                height={'100%'}
                objectFit={'cover'}
                borderRadius={'inherit'}
                src={album.images[0].url}
              />
            </Box>
          </GridItem>

          <GridItem>
            <Flex
              padding={'4px 12px '}
              direction={'column'}
              gap={'2rem'}
              justifyContent={'space-evenly'}
              width={'100%'}
              height={'100%'}
              borderRadius={'10px '}
              background={
                'linear-gradient(39deg, rgba(36,36,36,1) 40%, rgba(18,18,18,1) 100%)'
              }
            >
              <Heading
                textShadow={'0px 0px 10px green '}
                fontFamily={'system'}
                fontSize={'5rem'}
              >
                {album.name}
              </Heading>

              <Flex gap={'2'} justifyContent={'space-between'}>
                <VStack alignItems={'left'}>
                  <AlbumDetailBadge
                    text={`Release Date : ${album.release_date}`}
                  />
                  <AlbumDetailBadge text={`Popularity : ${album.popularity}`} />
                  <AlbumDetailBadge
                    text={`Total Tracks : ${album.total_tracks}`}
                  />
                </VStack>
                <PlayAllContainer />
              </Flex>

              <Flex gap={3} flexWrap={'wrap'}>
                {album.artists.map(({ name, id }) => (
                  <Link to={`/artist/${id}`} key={id}>
                    <Text
                      onClick={() => {
                        setSelectedArtistId(id);
                      }}
                      fontSize={'2rem'}
                      cursor={'pointer'}
                      color={'whiteAlpha.700'}
                      _hover={{ color: 'white', textDecoration: 'underline' }}
                    >
                      {name}
                      {', '}
                    </Text>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </GridItem>
        </Grid>

        <TrackList tracks={album.tracks.items} />
      </Flex>
    </Wrapper>
  );
};

export default AlbumDetailPage;
