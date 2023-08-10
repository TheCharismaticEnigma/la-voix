import { Flex, Box, Image, Text } from '@chakra-ui/react';
import { Artist } from '../entities/Artist';
import { Link } from 'react-router-dom';

interface Props {
  artist: Artist;
}
const ArtistListBar = ({ artist }: Props) => {
  const { images, name, id } = artist;

  return (
    <Link
      to={`/artist/${id}`}
      onClick={() => {
        console.log('done');
      }}
    >
      <Flex
        borderRadius={'10px'}
        cursor={'pointer'}
        padding={'5px'}
        gap={'1.5rem'}
        alignItems={'center'}
        _hover={{
          backgroundColor: '#25252580',
        }}
      >
        <Box
          height={'5rem'}
          width={'5rem'}
          overflow={'hidden'}
          objectFit={'cover'}
          borderRadius={'50%'}
        >
          <Image src={images[0].url} />
        </Box>
        <Text fontWeight={'400'}> {name} </Text>
      </Flex>
    </Link>
  );
};

export default ArtistListBar;
