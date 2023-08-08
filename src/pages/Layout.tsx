import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Wrapper from '../components/Wrapper';

const Layout = () => {
  return (
    // 2 Rows 3 Columns.
    <Box background={'gray.800'}>
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
      >
        <GridItem bg={'gray.700'} area={'leftSideBar'}>
          Left Bar
        </GridItem>

        <GridItem bg={'gray.700'} area={'mainView'} overflow={'hidden'}>
          <Outlet />
        </GridItem>

        <GridItem bg={'gray.700'} area={'rightSideBar'}>
          Right Bar{' '}
        </GridItem>

        <GridItem bg={'gray.900'} area={'nowPlayingBar'}>
          Now Playing Bar
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;

// Contains the Grid Layout.
