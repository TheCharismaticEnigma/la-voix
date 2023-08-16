import {
  Image,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Stack,
  Badge,
  HStack,
  VStack,
} from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import DetailContainer from '../components/DetailContainer';
import spotifyLogo from '../assets/spotifyLogo.svg';
import useAlbum from '../hooks/useAlbum';
import useSpotifyQueryStore from '../store';
import AlbumDetailBadge from '../components/AlbumDetailBadge';

const AlbumDetailPage = () => {
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);
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
        gap={'2rem'}
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
                {album.artists.map((artist) => (
                  <Text
                    key={artist.id}
                    cursor={'pointer'}
                    color={'whiteAlpha.700'}
                    fontSize={'1.8rem'}
                    _hover={{ textDecoration: 'underline', color: 'white' }}
                  >
                    {artist.name}
                    {', '}
                  </Text>
                ))}
              </Flex>
            </Flex>
          </GridItem>

          {/* <GridItem>
            <Flex
              height={'100%'}
              direction={'column'}
              fontSize={'2rem '}
              borderRadius={'10px'}
              padding={'8px'}
              gap={'2rem '}
              justifyContent={'space-between'}
            >
              <Heading
                textShadow={'0px 0px 10px green '}
                fontSize={'5.2rem'}
                fontFamily={'system'}
              >
                {artist?.name}
              </Heading>

              <Stack gap={'0.5rem'}>
                <DetailContainer
                  value={`Popularity - ${artist?.popularity} ` || '50'}
                />

                <DetailContainer
                  value={`Followers - ${artist?.followers.total} ` || '121212'}
                />

                <DetailContainer
                  value={` ${artist?.genres.slice(-2).join(', ')}` || '[]'}
                />
              </Stack>

              <Flex gap={'1rem'} alignItems={'center'}>
                <Box
                  width={'4rem'}
                  height={'4rem'}
                  borderRadius={'50%'}
                  cursor={'pointer'}
                  transition={'all 200ms'}
                  _hover={{
                    transform: 'translateY(-10%) ',
                  }}
                >
                  <Image src={spotifyLogo} />
                </Box>

                <Text textShadow={' 0 0 4px #1ED760 '} fontSize={'1.5rem'}>
                  Play All Songs
                </Text>
              </Flex>
            </Flex>
                  </GridItem> */}
        </Grid>
      </Flex>
    </Wrapper>
  );
};

export default AlbumDetailPage;
