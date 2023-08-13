import { Badge } from '@chakra-ui/react';

interface Props {
  badgeText: string | number;
}

const DetailBadge = ({ badgeText }: Props) => {
  return (
    <Badge
      variant="subtle"
      colorScheme="green"
      width={'fit-content'}
      padding={'0.5rem 1rem'}
      borderRadius={'5px'}
      fontSize={'2rem'}
    >
      {badgeText}
    </Badge>
  );
};

export default DetailBadge;
