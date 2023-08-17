import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

type VALID_TIME = 3600;

interface AccessToken {
  access_token: string;
  expires_in: VALID_TIME;
}

const tokenIsExpired = (startTime: number | undefined) => {
  return startTime && new Date().getTime() - startTime > 3500 * 1000; // 1h = 3600 * 1000 ms
};

// const TOKEN_EXPIRY_TIME = 3500 * 1000;

const useCachedToken = () => {
  const [error, setError] = useState<AxiosError>();
  const [startTime, setSessionStartTime] = useState<number>();

  // current Time in ms - sessionStartTime in ms > Expiry Time

  useEffect(() => {
    const controller = new AbortController();

    if (tokenIsExpired(startTime) || !startTime) {
      setSessionStartTime(new Date().getTime());

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
          localStorage.setItem('token', data.access_token);
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
