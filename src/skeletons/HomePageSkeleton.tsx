import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Skeleton,
} from '@chakra-ui/react';
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const CardSkeleton = () => {
  return (
    <Card height={'350px'} width={'min(100%, 350px)'} borderRadius={'3xl'}>
      <CardHeader height={'40%'} display={'flex'} flexDirection={'column'}>
        <SkeletonCircle size={'10'} marginBottom={'1rem'} />
        <Skeleton height={'150px'} />
      </CardHeader>
      <Divider />
      <CardBody>
        <SkeletonText mt="5" noOfLines={5} spacing="4" skeletonHeight="2" />
        <SkeletonText mt="5" noOfLines={3} spacing="4" skeletonHeight="2" />
      </CardBody>
    </Card>
  );
};

export default CardSkeleton;
