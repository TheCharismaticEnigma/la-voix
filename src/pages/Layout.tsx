import { Grid, GridItem } from '@chakra-ui/react';

const Layout = () => {
  const dummyBorder = '1px solid white';

  return (
    // 2 Rows 3 Columns.
    <Grid
      minH={'100%'}
      width={'100%'}
      height={'100vh'}
      border={dummyBorder}
      gridTemplateRows={'1fr 7.5rem'}
      gridTemplateColumns={'27rem 1fr 27rem '}
      templateAreas={`
        "leftSideBar   mainView      rightSideBar"
        "nowPlayingBar nowPlayingBar nowPlayingBar"
        `}
    >
      <GridItem area={'leftSideBar'} bg={'orange.300'}>
        Left Bar
      </GridItem>

      <GridItem overflow={'hidden auto'} area={'mainView'} bg={'pink.300'}>
        Main Content
      </GridItem>

      <GridItem area={'rightSideBar'} bg={'green.300'}>
        Right Bar{' '}
      </GridItem>

      <GridItem area={'nowPlayingBar'} bg={'blue.300'}>
        Now Playing Bar
      </GridItem>
    </Grid>
  );
};

export default Layout;

// Contains the Grid Layout.
