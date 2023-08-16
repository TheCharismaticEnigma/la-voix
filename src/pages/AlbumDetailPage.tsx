import { Flex } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';

const AlbumDetailPage = () => {
  // (Grid with two columsn and then Flex containers) Flex
  return (
    <Wrapper>
      <Flex
        background={'gray.700'}
        minH={'100%'}
        height={'fit-content'}
        borderRadius={'10px '}
        direction={'column'}
        gap={'2rem'}
        alignItems={'center'}
        padding={'8px'}
      >
        Graicas a todos
      </Flex>
    </Wrapper>
  );
};

export default AlbumDetailPage;
