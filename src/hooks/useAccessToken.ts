import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import staleTime from '../utils/staleTime';

type VALID_TIME = 3600;

interface AccessToken {
  access_token: string;
  expires_in: VALID_TIME;
}

const useAccessToken = () => {
  return useQuery({
    queryKey: ['access_token'],
    queryFn: () => {
      return axios
        .post<AccessToken>(
          'https://accounts.spotify.com/api/token',
          {
            // HTTP Body
            grant_type: 'client_credentials',
            client_id: '11d32aea63554cd2aeee7d3c935949d7',
            client_secret: '05f11e570dfa4fc39999c9bcf77717e3',
          },
          {
            // axios Config object.
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then(({ data }) => {
          return data.access_token;
        });
    },
    staleTime: staleTime('0.5h'),
    cacheTime: staleTime('0.5h'),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: true,
    refetchInterval: staleTime('0.5h'),
  });
};

export default useAccessToken;
