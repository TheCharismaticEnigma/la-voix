import axios from 'axios';
import { useEffect } from 'react';
import staleTime from '../utils/staleTime';

type VALID_TIME = 3600;

interface AccessToken {
  access_token: string;
  expires_in: VALID_TIME;
}

const validityDuration = staleTime('0.8h');

const tokenKey = 'token';
const sessionStartTimeKey = 'sessionStartTime';

const useCachedToken = () => {
  const controller = new AbortController();

  // Key is valid for 1 hour. So we refetch and restore it in the local storage every half hour.
  const currentTime = new Date().getTime();
  const startTime = localStorage.getItem(sessionStartTimeKey);

  // if (startTime is null or it is current time is 45min + startTime)
  // if (startTime isn't logged or key becomes invalid)

  useEffect(() => {
    if (!startTime || currentTime - +startTime >= validityDuration) {
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
          localStorage.setItem(tokenKey, data.access_token);
          localStorage.setItem(sessionStartTimeKey, `${currentTime}`);
          return data.access_token;
        });
    }

    return () => controller.abort();
  }, []);

  return;
};

export default useCachedToken;
