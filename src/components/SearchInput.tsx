import { Box, Flex, FormControl, Icon, Input } from '@chakra-ui/react';
import { useRef } from 'react';
import { FcSearch } from 'react-icons/fc';
import OptionTag from './OptionTag';

const SearchInput = () => {
  // Wrap with form + onSubmit => onClick + onKeyPress
  const inputTags = ['artist', 'album', 'track', 'playlist', 'show'];
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex direction={'column'} gap={'0.5rem'}>
      <Box padding={'8px 12px'} background={'gray.700'} borderRadius={'10px'}>
        <FormControl
          onSubmit={() => {
            console.log('Submitted');
          }}
        >
          <form>
            <Icon
              as={FcSearch}
              boxSize={10}
              position={'absolute'}
              transform={'translate(50%,50%)'}
              zIndex={'100'}
            />
            <Input
              ref={inputRef}
              variant={'filled'}
              border={'1px solid transparent'}
              _focus={{
                border: '1px solid white',
                backgroundColor: '#262626',
              }}
              type="text"
              spellCheck={false}
              autoCorrect="off"
              autoComplete="off"
              borderRadius={'2.5rem '}
              fontSize={{ base: '1rem', sm: '2rem' }}
              h={'4.5rem'}
              padding={'1px 5px 1px 5rem'}
              placeholder={`What would you like to hear?`}
              _placeholder={{ color: 'whiteAlpha.700' }}
            />
          </form>
        </FormControl>
      </Box>

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
    </Flex>
  );
};

export default SearchInput;
