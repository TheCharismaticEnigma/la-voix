import {
  Text,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import spotifyLogo from '../assets/spotifyLogo.svg';
import ArtistPopularTrack from '../components/ArtistPopularTrack';
import DetailContainer from '../components/DetailContainer';
import Wrapper from '../components/Wrapper';
import useArtist from '../hooks/useArtist';
import useTopArtistTracks from '../hooks/useTopArtistTracks';
import useSpotifyQueryStore from '../store';

const ArtistDetailPage = () => {
  const { spotifyQuery } = useSpotifyQueryStore();

  const { data: artist, isLoading } = useArtist(spotifyQuery.artistId);

  const { data: topTracks } = useTopArtistTracks(spotifyQuery.artistId);

  // Instead of throwing errors, have some placeholder data.

  const defaultDimension = '320px';

  return (
    <>
      <Wrapper>
        {isLoading && (
          <Spinner
            size={'xl'}
            transform={'translate(-50%,-50%)'}
            margin={'50%'}
          />
        )}
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
            gap={'1.5rem'}
            gridTemplateRows={'repeat(1, max(fit-content, 320px))'}
            gridTemplateColumns={'320px 1fr'}
          >
            <GridItem>
              <Box
                borderRadius={'10px'}
                width={artist?.images[1].width || defaultDimension}
                height={artist?.images[1].height || defaultDimension}
                overflow={'hidden'}
                boxShadow={'0px 0px 5px #262626 '}
              >
                <Image
                  width={'100%'}
                  height={'100%'}
                  objectFit={'cover'}
                  borderRadius={'inherit'}
                  src={artist?.images[0].url}
                />
              </Box>
            </GridItem>

            <GridItem>
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
                    value={
                      `Followers - ${artist?.followers.total} ` || '121212'
                    }
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
            </GridItem>
          </Grid>

          <Flex
            width={'100%'}
            background={'inherit'}
            padding={'inherit'}
            borderRadius={'inherit'}
            direction="column"
            gap={'2rem'}
          >
            <Divider />

            <Flex
              as="ul"
              direction={'column'}
              gap={'1rem'}
              alignItems={'center'}
            >
              {topTracks?.map((track, index) => (
                <Box as="li" key={index} width={'100%'}>
                  <ArtistPopularTrack track={track} serialNumber={index + 1} />
                </Box>
              ))}
            </Flex>

            <Divider />
          </Flex>
        </Flex>
      </Wrapper>
    </>
  );
};

export default ArtistDetailPage;
