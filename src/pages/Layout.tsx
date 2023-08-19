import { Box, Grid, GridItem } from '@chakra-ui/react';
import LeftSideBar from '../components/LeftSideBar';
import MainAppContent from './MainAppContent';
import NowPlayingContent from '../components/NowPlayingContent';
import RightSideBar from '../components/RightSideBar';
import useCachedToken from '../hooks/useCachedToken';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { CLIENT_ID } from '../utils/credentials';
// import axios, { AxiosError } from 'axios';

/*
type VALID_TIME = 3600;
interface AccessToken {
  access_token: string;
  expires_in: VALID_TIME;
  refresh_token: string;
}
*/

const Layout = () => {
  // All the STATE OF THE APP WILL BE HERE.

  /*
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === null) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/login'); // window.location.replace() ;
    }

    const controller = new AbortController();

    if (
      localStorage.getItem('loggedIn') &&
      !localStorage.getItem('access_token')
    ) {
      const redirectUri = 'http://localhost:5173/';

      const urlParams = new URLSearchParams(window.location.search);

      const code = urlParams.get('code');
      const codeVerifier = localStorage.getItem('code_verifier');

      const requestBody = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier,
      };

      axios
        .post<AccessToken>(
          'https://accounts.spotify.com/api/token',
          requestBody,
          {
            // axios Config object.
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            signal: controller.signal,
          }
        )
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
        })
        .catch((error: AxiosError) => {
          if (error && error.name !== 'CanceledError') {
            console.log('ERROR', error);
          }
        });
    }

    return () => {
      controller.abort();
      console.log('ABORTED');
    };
  }, []);
  */

  const { error } = useCachedToken();

  if (error) throw error;

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

        <GridItem area={'mainView'} overflow={'hidden'}>
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
