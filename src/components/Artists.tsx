import { Flex, Spinner } from '@chakra-ui/react';
import ArtistListBar from './ArtistListBar';
import Wrapper from './Wrapper';
import useRelatedArtists from '../hooks/useRelatedArtists';
import isCancelledError from '../services/isCancelledError';

const Artists = () => {
  const { data: relatedArtists, error, isLoading } = useRelatedArtists();

  if (error && !isCancelledError(error)) throw error; // Rethrow so that router can catch and render custom error page.

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
          {isLoading && <Spinner size={'lg'} margin={'auto '} />}

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
