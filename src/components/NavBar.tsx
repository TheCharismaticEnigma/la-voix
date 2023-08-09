import { Box, Flex } from '@chakra-ui/react';
import { BiHome, BiSearch } from 'react-icons/bi';
import NavElement from './NavElement';

const NavBar = () => {
  return (
    <Box
      as="nav"
      width={'100%'}
      height={'fit-content'}
      borderRadius={'10px'}
      background={'gray.700'}
      padding={'1.5rem 2rem '}
    >
      <Flex as="ul" width={'100%'} direction={'column'} gap={'2.5rem'}>
        <li>
          <NavElement icon={BiHome} path={'/'} text={'Home'} />
        </li>

        <li>
          <NavElement icon={BiSearch} path={'/search'} text={'Search'} />
        </li>
      </Flex>
    </Box>
  );
};

export default NavBar;
