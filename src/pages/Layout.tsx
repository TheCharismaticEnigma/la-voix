import { Box, Grid, GridItem } from '@chakra-ui/react';
import LeftSideBar from '../components/LeftSideBar';
import MainAppContent from './MainAppContent';
import NowPlayingContent from '../components/NowPlayingContent';
import RightSideBar from '../components/RightSideBar';
import useCachedToken from '../hooks/useCachedToken';

const Layout = () => {
  // All the STATE OF THE APP WILL BE HERE.

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
