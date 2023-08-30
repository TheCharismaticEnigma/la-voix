import { Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { BiHome, BiSearch } from 'react-icons/bi';
import { HiUserCircle } from 'react-icons/hi';
import logoutFromSpotify from '../utils/logoutFromSpotify';
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
        <Flex justifyContent={'space-between'} alignItems={'center'} as="li">
          <NavElement icon={BiHome} path={'/'} text={'Home'} />

          <Tooltip
            label="Logout"
            fontSize="xl"
            borderRadius={'5px'}
            color={'green.200'}
            bg={'gray.600'}
            placement="left"
            padding={'0.5em 0.75em '}
          >
            <Box
              borderRadius={'5px '}
              background={'gray.700'}
              display={'flex'}
              placeItems={'center'}
              gap={'2px'}
              p={'0 2px '}
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
          </Tooltip>
        </Flex>

        <li>
          <NavElement icon={BiSearch} path={'/search'} text={'Search'} />
        </li>
      </Flex>
    </Box>
  );
};

export default NavBar;
