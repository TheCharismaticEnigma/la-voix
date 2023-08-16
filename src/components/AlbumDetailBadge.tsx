import { Badge } from '@chakra-ui/react';

const AlbumDetailBadge = ({ text }: { text: string }) => {
  return (
    <Badge
      width={'fit-content'}
      fontWeight={'600'}
      padding={' 0.25em 0.5em'}
      fontSize={'1.4rem'}
      colorScheme="whatsapp"
      borderRadius={'5px'}
    >
      {text}
    </Badge>
  );
};

export default AlbumDetailBadge;
