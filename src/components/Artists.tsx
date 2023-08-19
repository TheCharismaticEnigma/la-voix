import { Flex } from '@chakra-ui/react';
import ArtistListBar from './ArtistListBar';
import Wrapper from './Wrapper';
import useRelatedArtists from '../hooks/useRelatedArtists';
import randomArtistId from '../utils/randomArtistId';
import useCachedToken from '../hooks/useCachedToken';
import { handleExpiredTokenError } from '../services/HttpService';

const Artists = () => {
  const { error: tokenError } = useCachedToken();
  if (tokenError) throw tokenError;

  const artistId = randomArtistId();

  const { data: relatedArtists, error } = useRelatedArtists(artistId);

  if (error) handleExpiredTokenError(error);

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
