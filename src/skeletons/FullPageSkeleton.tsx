import { Box, Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const FullPageSkeleton = () => {
  return (
    <Flex
      direction={'column'}
      gap={'2rem'}
      mt={'3rem'}
      margin={'0 auto'}
      width={'90%'}
      height={'100vh '}
    >
      <Box borderRadius={'1rem'} padding="6" boxShadow="lg" bg="gray.600">
        <SkeletonCircle size="10rem" />
        <SkeletonText mt="5" noOfLines={3} spacing="4" skeletonHeight="3" />
      </Box>

      <Flex width={'100%'} direction={'column'} as={'ul'} gap={'1.5rem'}>
        {[1, 2, 3].map((skeleton) => (
          <Box
            borderRadius={'1rem'}
            key={skeleton}
            padding="6"
            boxShadow="lg"
            bg="gray.600"
          >
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default FullPageSkeleton;
