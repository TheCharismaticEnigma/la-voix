import { useQuery } from '@tanstack/react-query';
import { RelatedArtists } from '../entities/RelatedArtists';
import HttpService from '../services/HttpService';
import useAccessToken from './useAccessToken';
import staleTime from '../utils/staleTime';

// const mainArtist = 'Arjit Singh';
// const arjitSinghId = `4YRxDV8wJFPHPTeXepOstw`;

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
