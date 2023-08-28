import { Box, Flex, Icon } from '@chakra-ui/react';
import { BiHome, BiSearch } from 'react-icons/bi';
import NavElement from './NavElement';
import { HiUserCircle } from 'react-icons/hi';
import logoutFromSpotify from '../utils/logoutFromSpotify';

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
        <Flex justifyContent={'space-between'} alignItems={'center'} as="li">
          <NavElement icon={BiHome} path={'/'} text={'Home'} />

          <Box
            borderRadius={'5px '}
            background={'gray.700'}
            display={'flex'}
            placeItems={'center'}
          >
            <Icon
              onClick={() => {
                logoutFromSpotify();
              }}
              cursor={'pointer'}
              as={HiUserCircle}
              color={'green.300'}
              boxSize={'3rem'}
              _hover={{
                color: 'green.200',
              }}
            />
          </Box>
        </Flex>

        <li>
          <NavElement icon={BiSearch} path={'/search'} text={'Search'} />
        </li>
      </Flex>
    </Box>
  );
};

export default NavBar;
