import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  START_TIME_KEY,
  TOKEN_KEY,
} from '../utils/credentials';

export type VALID_TIME = 3600;

export interface AccessToken {
  access_token: string;
  expires_in: VALID_TIME;
}

const tokenIsExpired = () => {
  const sessionStartTime = localStorage.getItem(START_TIME_KEY);
  return (
    sessionStartTime && new Date().getTime() - +sessionStartTime > 3500 * 1000
  ); // 1h = 3600 * 1000 ms
};

const useCachedToken = () => {
  const [error, setError] = useState<AxiosError>();

  const tokenExists = localStorage.getItem(TOKEN_KEY) !== null;

  // current Time in ms - sessionStartTime in ms > Expiry Time
  useEffect(() => {
    const controller = new AbortController();

    if (
      (tokenExists && tokenIsExpired()) ||
      !localStorage.getItem(START_TIME_KEY) ||
      !tokenExists
    ) {
      localStorage.setItem(START_TIME_KEY, `${new Date().getTime()}`);

      axios
        .post<AccessToken>(
          'https://accounts.spotify.com/api/token',
          {
            // HTTP Body
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          },
          {
            // axios Config object.
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            signal: controller.signal,
          }
        )
        .then(({ data }) => {
          localStorage.setItem(TOKEN_KEY, data.access_token);
          return data.access_token;
        })
        .catch((error: AxiosError) => {
          if (error && error.name !== 'CanceledError') {
            setError(error);
          }
        });
    }

    return () => controller.abort();
  }, []);

  return { error };
};

export default useCachedToken;

// (ONLY IF NEEDED) Fetch and Cache the access_token in local storage
// When token expires, we remove it from the local storage and thus ask to refetch.

/* 
 Authorization w/ PKCE  (proof key of code exchange) : 
 The above is client-credentials authorization flow. 
*/

/*  
Login Page Background 
background-image: linear-gradient( 270deg, rgba(176, 42, 42, .16) 0%, rgba(176, 42, 42, .56) 18.45%, rgba(176, 42, 42, .8) 49.67%, rgba(176, 42, 42, .56) 82.52%, rgba(176, 42, 42, .196364) 99.7%, rgba(189, 40, 40, 0) 99.71%, rgba(203, 56, 55, 0) 99.72%, rgba(203, 56, 55, .16) 99.73% ), 
url(https://static-production.npmjs.com/abf53a3….png)
*/
