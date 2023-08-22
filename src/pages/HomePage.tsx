import { Flex } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';

const HomePage = () => {
  return (
    <Wrapper>
      <Flex
        background={'gray.700'}
        height={'100%'}
        width={'100%'}
        borderRadius={'10px '}
        padding={'8px 12px'}
      >
        {localStorage.getItem('acess_token') || 'NO TOKEN'}
      </Flex>
    </Wrapper>
  );
};

export default HomePage;

// For Components => gray.700
