import { Tag } from '@chakra-ui/react';

interface Props {
  tagText: string | undefined;
}

const ShowTag = ({ tagText }: Props) => {
  if (!tagText) return null;

  const content = tagText.toUpperCase();

  return (
    <Tag
      w={'fit-content'}
      colorScheme="gray"
      padding={'0.35em 0.5em'}
      fontSize={'1.5rem'}
      background={'gray.600'}
    >
      {content}
    </Tag>
  );
};

export default ShowTag;
