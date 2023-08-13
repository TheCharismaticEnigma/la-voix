import { Flex } from '@chakra-ui/react';
import DetailBadge from './DetailBadge';

interface Props {
  value: string | number;
}

const DetailContainer = ({ value }: Props) => {
  return (
    <Flex alignItems={'center'}>
      <DetailBadge badgeText={value} />
    </Flex>
  );
};

export default DetailContainer;
