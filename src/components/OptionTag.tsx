import { Box } from '@chakra-ui/react';

interface Props {
  text: string;
  value: string;
}

const OptionTag = ({ text, value }: Props) => {
  return (
    <Box
      background={'gray.600'}
      textTransform={'capitalize'}
      fontSize={'1.6rem'}
      cursor={'pointer'}
      borderRadius={'20px'}
      padding={'0.35em 0.75em'}
      transition={'all 150ms ease-out'}
      _hover={{
        transform: 'translateY(-10%) ',
        backgroundColor: 'gray.700',
      }}
    >
      <option
        onClick={() => {
          console.log(value);
        }}
        value={value}
      >
        {text}
      </option>
    </Box>
  );
};

export default OptionTag;
