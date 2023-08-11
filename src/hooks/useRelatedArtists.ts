import { useEffect, useState } from 'react';
import { Artist } from '../entities/Artist';
import { RelatedArtists } from '../entities/RelatedArtists';
import HttpService from '../services/HttpService';
import randomArtistId from '../utils/randomArtistId';
import useAccessToken from './useAccessToken';

// const mainArtist = 'Arjit Singh';
// const arjitSinghId = `4YRxDV8wJFPHPTeXepOstw`;

/*
const useRelatedArtists = (artistId: string) => {
  const accessToken = useAccessToken();

  const httpService = new HttpService<RelatedArtists>(
    `/artists/${artistId}/related-artists`,
    accessToken!
  );

  return useQuery({
    queryKey: ['relatedArtists', artistId],
    queryFn: () => {
      return httpService.get();
    },
    staleTime: staleTime('24h'),
    retry: 3,
  });
};

export default useRelatedArtists;
*/

const useRelatedArtists = () => {
  const [relatedArtists, setRelatedArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const accessToken = useAccessToken();
  const artistId = randomArtistId();

  useEffect(() => {
    const controller = new AbortController();

    const httpService = new HttpService<RelatedArtists>(
      `/artists/${artistId}/related-artists`,
      accessToken!
    );

    httpService
      .get({
        signal: controller.signal,
      })
      .then(({ artists }) => {
        setIsLoading(false);
        setRelatedArtists(artists);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });

    return () => controller.abort(); // cleanup code.
  }, []);

  return { data: relatedArtists, error, isLoading };
};

export default useRelatedArtists;
