import { Flex, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface Props {
  path: string;
  icon: IconType;
  text: string;
}

const NavElement = ({ icon, path, text }: Props) => {
  return (
    <Flex gap={'2rem'} alignItems={'center'}>
      <Link to={path}>
        <Icon cursor={'pointer'} as={icon} color={'white'} boxSize={'3rem'} />
      </Link>

      <Link to={path}>
        <Text
          color={'whiteAlpha.800'}
          fontSize={'1.7rem'}
          transition={'all 100ms ease-out'}
          _hover={{ color: 'white', transform: 'scale(1.1)' }}
        >
          {text}
        </Text>
      </Link>
    </Flex>
  );
};

export default NavElement;
