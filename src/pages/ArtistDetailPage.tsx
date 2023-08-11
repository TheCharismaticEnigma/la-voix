import { Box, Spinner, Text } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import useSpotifyQueryStore from '../store';
import { useEffect, useState } from 'react';
import HttpService from '../services/HttpService';
import { Artist } from '../entities/Artist';
import isCancelledError from '../services/isCancelledError';
import useAccessToken from '../hooks/useAccessToken';

const ArtistDetailPage = () => {
  const spotifyQuery = useSpotifyQueryStore(
    (selector) => selector.spotifyQuery
  ); // component only dependent on the spotifyQuery object. Renrenders on when this property from store changes,

  const accessToken = useAccessToken();

  const [artist, setArtist] = useState<Artist>({} as Artist);
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);

  if (error && !isCancelledError(error)) throw error; // Rethrow for router

  useEffect(() => {
    const { artistId } = spotifyQuery;
    const httpService = new HttpService<Artist>(
      `/artists/${artistId}`,
      accessToken!
    );
    const controller = new AbortController();

    httpService
      .get({
        signal: controller.signal,
      })
      .then((artist) => {
        setArtist(artist);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [artist]);

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
        <Box
          background={'gray.700'}
          minH={'100%'}
          height={'fit-content'}
          borderRadius={'10px '}
          padding={'8px 12px'}
        >
          <Text>{spotifyQuery.artistId}</Text>
          <Text>{artist.name}</Text>
        </Box>
      </Wrapper>
    </>
  );
};

export default ArtistDetailPage;
