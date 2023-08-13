import { Badge } from '@chakra-ui/react';

interface Props {
  badgeText: string | number;
}

const DetailBadge = ({ badgeText }: Props) => {
  return (
    <Badge
      variant="subtle"
      color={'black'}
      background={'#1ED760'}
      width={'fit-content'}
      padding={'0.5rem 1rem'}
      borderRadius={'5px'}
      fontSize={'1.5rem'}
      wordBreak={'break-word'}
    >
      {badgeText}
    </Badge>
  );
};

export default DetailBadge;
