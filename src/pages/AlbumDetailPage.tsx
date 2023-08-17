import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AlbumDetailBadge from '../components/AlbumDetailBadge';
import ArtistPopularTrack from '../components/ArtistPopularTrack';
import Wrapper from '../components/Wrapper';
import useAlbum from '../hooks/useAlbum';
import useCachedToken from '../hooks/useCachedToken';
import useSpotifyQueryStore from '../store';

const AlbumDetailPage = () => {
  const { error } = useCachedToken();
  if (error) throw error;

  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);
  const setSelectedArtistId = useSpotifyQueryStore(
    (s) => s.setSelectedArtistId
  );

  const { data: album } = useAlbum(spotifyQuery.albumId);
  console.log('ALBUM', album);

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
        gap={'2.5rem'}
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
              gap={'1rem'}
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

              <Flex direction={'column'} justifyContent={'left'} gap={'2'}>
                <AlbumDetailBadge
                  text={`Release Date : ${album.release_date}`}
                />
                <AlbumDetailBadge text={`Popularity : ${album.popularity}`} />
                <AlbumDetailBadge
                  text={`Total Tracks : ${album.total_tracks}`}
                />
              </Flex>

              <Flex wrap={'wrap'} gap={2}>
                {album.artists.map(({ id, name }) => (
                  <Link to={`/artist/${id}`} key={id}>
                    <Text
                      onClick={() => setSelectedArtistId(id)}
                      cursor={'pointer'}
                      color={'whiteAlpha.700'}
                      fontSize={'1.8rem'}
                      _hover={{ textDecoration: 'underline', color: 'white' }}
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

        <Flex
          width={'100% '}
          as="ul"
          direction={'column'}
          gap={'1rem'}
          alignItems={'center'}
          borderRadius={'inherit'}
        >
          <Divider />

          {album.tracks.items?.map((track, index) => (
            <Box as="li" key={index} width={'100%'}>
              <ArtistPopularTrack track={track} serialNumber={index + 1} />
            </Box>
          ))}

          <Divider />
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default AlbumDetailPage;
