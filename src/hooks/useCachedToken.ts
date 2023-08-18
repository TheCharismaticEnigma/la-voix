import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

export type VALID_TIME = 3600;

export interface AccessToken {
  access_token: string;
  expires_in: VALID_TIME;
}

const START_TIME_KEY = 'startTime';
const TOKEN_KEY = 'token';

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
            client_id: '11d32aea63554cd2aeee7d3c935949d7',
            client_secret: '05f11e570dfa4fc39999c9bcf77717e3',
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
