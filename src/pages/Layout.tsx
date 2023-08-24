import { Box, Grid, GridItem } from '@chakra-ui/react';
import LeftSideBar from '../components/LeftSideBar';
import NowPlayingContent from '../components/NowPlayingContent';
import RightSideBar from '../components/RightSideBar';
import MainAppContent from './MainAppContent';
import { AccessToken } from '@spotify/web-api-ts-sdk';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CLIENT_ID } from '../utils/credentials';
import { refreshToken } from '../services/HttpService';

const Layout = () => {
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
        })
        .catch((error) => {
          if (error.name !== 'CanceledError') console.log(error);
        });

      setInterval(() => {
        refreshToken();
      }, 3000000); // 50 minutes in ms
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

  return (
    // 2 Rows 3 Columns.
    <Box>
      <Grid
        minH={'100%'}
        width={'100%'}
        height={'100vh'}
        gap={'1rem'}
        gridTemplateRows={'1fr 7.5rem'}
        gridTemplateColumns={'27rem 1fr 27rem '}
        templateAreas={`
          "leftSideBar   mainView      rightSideBar"
          "nowPlayingBar nowPlayingBar nowPlayingBar"
        `}
        padding={' 1rem 0.5rem 0  '}
        overflow={'hidden'}
      >
        <GridItem area={'leftSideBar'} overflow={'hidden'}>
          <LeftSideBar />
        </GridItem>

        <GridItem width={'100%'} area={'mainView'} overflow={'hidden'}>
          <MainAppContent />
        </GridItem>

        <GridItem area={'rightSideBar'} overflow={'hidden'}>
          <RightSideBar />
        </GridItem>

        <GridItem area={'nowPlayingBar'} overflow={'hidden'}>
          <NowPlayingContent />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;

// Contains the Grid Layout.
