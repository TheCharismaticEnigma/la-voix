import { Flex, Box, Image, Text } from '@chakra-ui/react';
import spotifyLogo from '../assets/spotifyLogo.svg';

const PlayAllContainer = () => {
  return (
    <Flex gap={'1rem'} alignItems={'center '}>
      <Box
        width={'4rem'}
        height={'4rem'}
        borderRadius={'50%'}
        cursor={'pointer'}
        transition={'all 200ms'}
        _hover={{
          transform: 'translateY(-10%) ',
        }}
      >
        <Image src={spotifyLogo} />
      </Box>

      <Text textShadow={' 0 0 4px #1ED760 '} fontSize={'1.5rem'}>
        Play All Songs
      </Text>
    </Flex>
  );
};

export default PlayAllContainer;
