/*import { useQuery } from '@tanstack/react-query';
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
    staleTime: staleTime('0.5h'),// time after which data will be stale. 
    cacheTime: staleTime('0.5h'), // time after which stale data will  be garbage collected.
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: true,
    refetchInterval: staleTime('0.5h'),
  });
};

export default useAccessToken;
*/

import { AccessToken } from '@spotify/web-api-ts-sdk';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CLIENT_ID, START_TIME_KEY } from '../utils/credentials';

const useAccessToken = () => {
  const redirectUri = 'http://localhost:5173/';

  const [searchParams] = useSearchParams(); // [setSearchParams]

  useEffect(() => {
    if (!localStorage.getItem('logged_in')) {
      window.location.assign('/login');
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem('code_verifier') &&
      localStorage.getItem('access_token') === null
    ) {
      const code = searchParams.get('code');
      const codeVerifier = localStorage.getItem('code_verifier');

      const httpBody = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier,
      };

      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      axios
        .post<AccessToken>(
          'https://accounts.spotify.com/api/token',
          httpBody,
          requestConfig
        )
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          localStorage.setItem(START_TIME_KEY, `${new Date().getTime()}`);
        })
        .catch((error) => {
          if (error.name !== 'CanceledError') console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        })
        .then((res) => console.log(res));
    }
  }, []);
};

export default useAccessToken;
