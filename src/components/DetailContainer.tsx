import { Flex } from '@chakra-ui/react';
import DetailBadge from './DetailBadge';

interface Props {
  label: string | number;
  value: string | number;
}

const DetailContainer = ({ label, value }: Props) => {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'space-between'}
      width={'100%'}
      gap={'1rem'}
    >
      <DetailBadge badgeText={label} />
      <DetailBadge badgeText={value} />
    </Flex>
  );
};

export default DetailContainer;
