import axios from 'axios';
import { useEffect } from 'react';

type VALID_TIME = 3600;

interface AccessToken {
  access_token: string;
  expires_in: VALID_TIME;
}

const useCachedToken = () => {
  useEffect(() => {
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
        }
      )
      .then(({ data }) => {
        localStorage.setItem('token', data.access_token);
        return data.access_token;
      });
  }, []);

  return;
};

export default useCachedToken;
