import { Card, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const AlbumCardSkeleton = () => {
  return (
    <>
      <Card
        mt={'1rem'}
        padding={'8px 12px'}
        borderRadius={'10'}
        width={'100%'}
        height={'25rem'}
        gap={'1.5rem'}
      >
        <SkeletonCircle size="6rem" />
        <SkeletonText mt="4" noOfLines={10} spacing="4" skeletonHeight="2" />
      </Card>
    </>
  );
};

export default AlbumCardSkeleton;
