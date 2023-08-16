import { useQuery } from '@tanstack/react-query';
import { Artist } from '../entities/Artist';
import HttpService from '../services/HttpService';
import staleTime from '../utils/staleTime';
import { artists } from '../initialData/initialArtists';

// const mainArtist = 'Arjit Singh';
// const arjitSinghId = `4YRxDV8wJFPHPTeXepOstw`;

/*

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

*/

const useRelatedArtists = (artistId: string) => {
  const httpService = new HttpService<Artist>(
    `/artists/${artistId}/related-artists`
  );

  return useQuery({
    queryKey: ['related-artists', artistId], // everytime id changes, it refetches data.
    queryFn: () => {
      return httpService.getAll().then((artists) => {
        return artists.artists;
      });
    },
    staleTime: staleTime('1h'),
    retry: 3,
    placeholderData: artists,
  });
};

export default useRelatedArtists;
