import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Album } from '../entities/Album';
import { Link } from 'react-router-dom';
import useSpotifyQueryStore from '../store';

interface Props {
  album: Album;
}

const AlbumCard = ({ album }: Props) => {
  const { setSelectedAlbumId } = useSpotifyQueryStore();

  return (
    <Link
      to={`/album/${album.id}`}
      onClick={() => {
        setSelectedAlbumId(album.id);
      }}
    >
      <Flex
        boxShadow={' 0 0 5px 0 #2a2a2a'}
        background={'gray.700'}
        borderRadius={'10px'}
        width={'100%'}
        padding={'8px 12px'}
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
    </Link>
  );
};

export default AlbumCard;
