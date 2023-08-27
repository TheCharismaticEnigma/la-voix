import { Box, Grid, GridItem } from '@chakra-ui/react';
import LeftSideBar from '../components/LeftSideBar';
import NowPlayingContent from '../components/NowPlayingContent';
import RightSideBar from '../components/RightSideBar';
import useAccessToken from '../hooks/useAccessToken';
import MainAppContent from './MainAppContent';

const Layout = () => {
  if (
    !localStorage.getItem('logged_in') ||
    (localStorage.getItem('logged_in') && !localStorage.getItem('access_token'))
  ) {
    window.location.assign('/login');
  }

  // Fetch the Access and Refresh Tokens.
  useAccessToken();

  /*
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
  */

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
