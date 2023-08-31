import { useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

interface Props {
  text?: string;
  summaryLength?: number;
}

const ShowHideText = ({ text = '', summaryLength = 300 }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const summary = text.substring(0, summaryLength) || '';

  return (
    <Box>
      {!showAll && (
        <Text color={'gray.200'} fontSize={'1.8rem'}>
          {summary}
        </Text>
      )}

      {showAll && (
        <Text color={'gray.200'} fontSize={'1.8rem'}>
          {text}
        </Text>
      )}

      {summary.length < text.length && (
        <Button
          onClick={() => {
            setShowAll(!showAll);
          }}
          mt={3}
          p={'10px 5px 12px   '}
          fontSize={'1.8rem'}
        >
          {`${showAll ? 'Show Less' : 'Show More'}`}
        </Button>
      )}
    </Box>
  );
};

export default ShowHideText;
