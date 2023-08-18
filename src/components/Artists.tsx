import { Flex } from '@chakra-ui/react';
import ArtistListBar from './ArtistListBar';
import Wrapper from './Wrapper';
import useRelatedArtists from '../hooks/useRelatedArtists';
import randomArtistId from '../utils/randomArtistId';
import useCachedToken from '../hooks/useCachedToken';

const Artists = () => {
  const { error } = useCachedToken();
  if (error) throw error;

  const artistId = randomArtistId();

  const { data: relatedArtists } = useRelatedArtists(artistId);

  return (
    <Wrapper>
      <Flex
        direction={'column'}
        padding={'1rem 1rem'}
        background={'gray.700'}
        borderRadius={'10px '}
        borderTopRightRadius={'0'}
        height={'auto'}
      >
        <Flex as="ul" direction={'column'} fontSize={'1.8rem'} gap={'0.5rem'}>
          {relatedArtists?.map((artist) => (
            <li key={artist.id}>
              <ArtistListBar artist={artist} />
            </li>
          ))}
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default Artists;

// Component displays all the related artists.
