import { Card, CardBody, Skeleton } from '@chakra-ui/react';

const AlbumCardSkeleton = () => {
  return (
    <>
      <Card
        padding={'8px 12px'}
        borderRadius={'10'}
        width={'100%'}
        height={'25rem'}
        gap={'1.5rem'}
      >
        <Skeleton height={'20px'} />
        <Skeleton height={'20px'} />
        <Skeleton height={'20px'} />
        <Skeleton height={'20px'} />
        <Skeleton height={'20px'} />
        <Skeleton height={'20px'} />
        <Skeleton height={'20px'} />

        <CardBody width={'100%'} flexDirection={'column'} gap={'1rem'}>
          <Skeleton />
          <Skeleton />
        </CardBody>
      </Card>
    </>
  );
};

export default AlbumCardSkeleton;
