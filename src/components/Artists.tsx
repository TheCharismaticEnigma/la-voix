import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Wrapper from './Wrapper';

const Artists = () => {
  const artists = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

  return (
    <Wrapper>
      <Flex
        direction={'column'}
        padding={'1rem 1rem'}
        background={'gray.700'}
        borderRadius={'10px '}
        height={'auto'}
      >
        <Flex as="ul" direction={'column'} fontSize={'1.8rem'} gap={'0.5rem'}>
          {artists.map((artist, index) => (
            <li key={index}>
              <Flex
                borderRadius={'10px'}
                cursor={'pointer'}
                padding={'5px'}
                gap={'1.5rem'}
                alignItems={'center'}
                _hover={{
                  backgroundColor: '#25252560',
                }}
              >
                <Box
                  height={'5rem'}
                  width={'5rem'}
                  overflow={'hidden'}
                  objectFit={'cover'}
                  borderRadius={'50%'}
                >
                  <Image border={'2px solid green '} />
                </Box>

                <Text fontWeight={'400'}>Artist Name </Text>
              </Flex>
            </li>
          ))}
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default Artists;

// Component displays all the related artists.
