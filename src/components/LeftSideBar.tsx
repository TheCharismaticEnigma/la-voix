import { Flex } from '@chakra-ui/react';
import NavBar from './NavBar';
import Artists from './Artists';
// import Wrapper from './Wrapper';

const LeftSideBar = () => {
  return (
    <Flex height={'100%'} direction={'column'} gap={'1rem'}>
      <NavBar />
      <Artists />
    </Flex>
  );
};

export default LeftSideBar;

// React Query eliminates the need for effect hook
// Zustand eliminates the need for prop drilling.
