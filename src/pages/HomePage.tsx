import { Flex } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import useAccessToken from '../hooks/useAccessToken';

const HomePage = () => {
  const token = useAccessToken();

  return (
    <Wrapper>
      <Flex
        background={'gray.700'}
        height={'100%'}
        width={'100%'}
        borderRadius={'inherit'}
        padding={'8px 12px'}
      >
        {token}
      </Flex>
    </Wrapper>
  );
};

export default HomePage;

// For Components => gray.700
