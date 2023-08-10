import { Box, Flex } from '@chakra-ui/react';
import HomePage from './HomePage';

const QueryHomePage = () => {
  return (
    <Flex>
      <Box>Search Bar </Box>
      <HomePage />
    </Flex>
  );
};

export default QueryHomePage;
