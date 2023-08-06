import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import staleTime from '../utils/staleTime';

type VALID_TIME = 3600;

interface AccessToken {
  access_token: string;
  expires_in: VALID_TIME;
}

/*
interface AccessTokenResponse<T> {
  status: number;
  statusText: string;
  data: T;
}
*/

// Using react query, we store the TOKEN IN THE CACHE for 1h until IT EXPIRES.
// Then we refetch it.

// Every error in Axios is an instance of Error

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
    staleTime: staleTime('1h'), // 1h
  });
};

export default useAccessToken;
