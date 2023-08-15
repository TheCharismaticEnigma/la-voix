import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Album } from '../entities/Album';

interface Props {
  album: Album;
}

const AlbumCard = ({ album }: Props) => {
  return (
    <Flex
      boxShadow={' 0 0 5px 0 #2a2a2a'}
      background={'gray.700'}
      borderRadius={'10px'}
      width={'100%'}
      padding={'8px 10px'}
      direction={'column'}
      gap={'1rem'}
      cursor={'pointer'}
      transition={'all 200ms ease-out'}
      _hover={{ background: '#2a2a2a' }}
    >
      <Box width={'100%'} borderRadius={'inherit'}>
        <Image
          objectFit={'cover'}
          borderRadius={'inherit'}
          width={'100%'}
          src={album?.images[0].url}
        />
      </Box>

      {/*  Detail Container*/}
      <Flex
        cursor={'pointer'}
        padding={'5px'}
        direction={'inherit'}
        gap={'1rem'}
      >
        <Text
          pointerEvents={'none'}
          fontSize={'2.4rem'}
          fontWeight={'500'}
          fontFamily={'system'}
        >
          {album?.name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default AlbumCard;
