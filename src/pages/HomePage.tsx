import { Flex } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';

const HomePage = () => {
  const token = localStorage.getItem('token');

  return (
    <Wrapper>
      <Flex
        background={'gray.700'}
        height={'100%'}
        width={'100%'}
        borderRadius={'10px '}
        padding={'8px 12px'}
      >
        {token}
      </Flex>
    </Wrapper>
  );
};

export default HomePage;

// For Components => gray.700
