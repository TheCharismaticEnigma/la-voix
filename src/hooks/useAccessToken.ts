import { AccessToken } from '@spotify/web-api-ts-sdk';
import axios, { AxiosRequestConfig } from 'axios';
import { CLIENT_ID } from '../utils/credentials';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { refreshToken } from '../services/HttpService';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../utils/credentials';

setInterval(() => {
  refreshToken();
}, 3000000); // 50 minutes in ms

const useAccessToken = () => {
  if (!localStorage.getItem('logged_in')) window.location.replace('/login');

  // const redirectUri = 'http://localhost:5173/';
  // const redirectUri = 'https://la-voix.vercel.app/';
  const redirectUri = 'https://la-voix-6552e.web.app/';

  const [searchParams] = useSearchParams(); // [setSearchParams]

  useEffect(() => {
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
        localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
      })
      .catch((error) => {
        if (error.name !== 'CanceledError') console.log(error);
      });
  }, []);
};

export default useAccessToken;
