import { Box, Spinner, Text } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import useSpotifyQueryStore from '../store';
import { useEffect, useState } from 'react';
import HttpService from '../services/HttpService';
import { Artist } from '../entities/Artist';
import isCancelledError from '../services/isCancelledError';
import useAccessToken from '../hooks/useAccessToken';
import { Track } from '../entities/Track';
import useTopArtistTracks from '../hooks/useTopArtistTracks';

const ArtistDetailPage = () => {
  const { spotifyQuery } = useSpotifyQueryStore();

  const accessToken = useAccessToken();

  const [artist, setArtist] = useState<Artist>({} as Artist);
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);

  if (error && !isCancelledError(error)) throw error; // Rethrow for router

  useEffect(() => {
    const controller = new AbortController();
    const { artistId } = spotifyQuery;

    const httpService = new HttpService<Artist>(
      `/artists/${artistId}`,
      accessToken!
    );

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
  }, [spotifyQuery]);

  const { data, error: trackError } = useTopArtistTracks(
    spotifyQuery.artistId,
    accessToken!
  );

  console.log(data);

  if (trackError) throw error;

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
          <Text>{artist?.name}</Text>
          <Text>{artist?.followers?.total}</Text>
        </Box>
      </Wrapper>
    </>
  );
};

export default ArtistDetailPage;
