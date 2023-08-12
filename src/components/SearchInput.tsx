import { Box, FormControl, Icon, Input } from '@chakra-ui/react';
import { FcSearch } from 'react-icons/fc';

const SearchInput = () => {
  return (
    <Box padding={'8px 12px'} background={'gray.700'} borderRadius={'10px'}>
      <FormControl>
        <form>
          <Icon
            as={FcSearch}
            boxSize={10}
            position={'absolute'}
            transform={'translate(50%,50%)'}
            zIndex={'100'}
          />
          <Input
            variant={'filled'}
            _focus={{
              border: '1px solid white',
              backgroundColor: '#262626',
            }}
            type="text"
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
  );
};

export default SearchInput;
