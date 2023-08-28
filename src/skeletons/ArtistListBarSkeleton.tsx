import { SkeletonCircle, SkeletonText, Box } from '@chakra-ui/react';

const ArtistListBarSkeleton = () => {
  return (
    <Box
      mb={'1rem'}
      borderRadius={'1rem'}
      padding="6"
      boxShadow="lg"
      bg="gray.600"
      gap={'1rem'}
    >
      <SkeletonCircle size={'10'} />
      <SkeletonText mt={4} noOfLines={2} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ArtistListBarSkeleton;
