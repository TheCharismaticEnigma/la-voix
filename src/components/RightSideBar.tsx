import Wrapper from './Wrapper';
import { Flex } from '@chakra-ui/react';

const RightSideBar = () => {
  return (
    <Wrapper>
      <Flex
        padding={'1rem 1rem'}
        background={'gray.700'}
        borderRadius={'10px '}
        borderTopRightRadius={'0'}
        height={'auto'}
        minH={'100%'}
      >
        Right Side Bar
      </Flex>
    </Wrapper>
  );
};

export default RightSideBar;
