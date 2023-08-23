import { Flex } from '@chakra-ui/react';
import OptionTag from './OptionTag';
import { inputTags } from '../utils/inputTags';

const OptionTagContainer = () => {
  //   const inputTags = ['artist', 'album', 'track', 'playlist', 'show'];

  return (
    <Flex
      padding={'4px 12px '}
      borderRadius={'1rem'}
      gap={'1rem '}
      justifyContent={'center'}
    >
      {inputTags.map((tag, index) => (
        <OptionTag key={index} text={tag} value={tag} />
      ))}
    </Flex>
  );
};

export default OptionTagContainer;
