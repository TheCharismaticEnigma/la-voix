import { Flex } from '@chakra-ui/react';
import HomePage from './HomePage';
import SearchInput from '../components/SearchInput';

const QueryHomePage = () => {
  // State for the query home page.

  return (
    <Flex
      direction={'column'}
      gap={'1rem'}
      borderRadius={'10px'}
      height={'100%'}
    >
      <SearchInput />
      <HomePage />
    </Flex>
  );
};

export default QueryHomePage;
