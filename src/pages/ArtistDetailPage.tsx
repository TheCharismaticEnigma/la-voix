import {
  Box,
  Flex,
  Spinner,
  Text,
  Image,
  Stack,
  Heading,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import useAccessToken from '../hooks/useAccessToken';
import useTopArtistTracks from '../hooks/useTopArtistTracks';
import useSpotifyQueryStore from '../store';
import useArtist from '../hooks/useArtist';

const ArtistDetailPage = () => {
  const { spotifyQuery } = useSpotifyQueryStore();
  const accessToken = useAccessToken();

  const {
    data: artist,
    isLoading,
    error,
  } = useArtist(spotifyQuery.artistId, accessToken!);

  if (error) throw error;

  const { data, error: trackError } = useTopArtistTracks(
    spotifyQuery.artistId,
    accessToken!
  );

  console.log(data);
  console.log(artist?.images);

  if (trackError) throw trackError;

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
            width={'100%'}
            gap={'1rem'}
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
              <Stack
                fontSize={'2rem '}
                background={'gray.700'}
                borderRadius={'10px'}
                padding={'8px'}
                gap={'3rem '}
              >
                <Heading
                  wordBreak={'break-word'}
                  textAlign={'center'}
                  fontSize={'5.5rem'}
                >
                  {artist?.name}
                </Heading>

                <Stack>
                  <Text> {artist?.followers?.total}</Text>
                  <Text> {artist?.popularity}</Text>
                </Stack>
              </Stack>
            </GridItem>
          </Grid>
        </Flex>
      </Wrapper>
    </>
  );
};

export default ArtistDetailPage;
