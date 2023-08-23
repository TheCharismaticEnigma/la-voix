import { Box } from '@chakra-ui/react';
import useSpotifyQueryStore from '../store';

interface Props {
  text: string;
  value: string;
}

const OptionTag = ({ text, value }: Props) => {
  const setSearchQueryTag = useSpotifyQueryStore((s) => s.setSearchQueryTag);
  const spotifyQuery = useSpotifyQueryStore((s) => s.spotifyQuery);

  const background =
    spotifyQuery?.searchQueryTag === value ? `whiteAlpha.400` : 'gray.600';

  return (
    <Box
      onClick={() => {
        setSearchQueryTag(value);
      }}
      background={'gray.600'}
      textTransform={'capitalize'}
      fontSize={'1.6rem'}
      cursor={'pointer'}
      borderRadius={'20px'}
      padding={'0.35em 0.75em'}
      transition={'all 100ms ease-out'}
      backgroundColor={background}
      _hover={{
        transform: 'translateY(-10%) ',
      }}
    >
      <option style={{ pointerEvents: 'none' }} value={value}>
        {text}
      </option>
    </Box>
  );
};

export default OptionTag;
