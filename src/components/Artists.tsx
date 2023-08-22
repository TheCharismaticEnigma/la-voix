import { Flex } from '@chakra-ui/react';
import { Artist } from '../entities/Artist';
import useArtist from '../hooks/useArtist';
import useRelatedArtists from '../hooks/useRelatedArtists';
import useSpotifyQueryStore from '../store';
import getUniqueArtists from '../utils/getUniqueArtists';
import ArtistListBar from './ArtistListBar';
import Wrapper from './Wrapper';

const Artists = () => {
  const { artistId } = useSpotifyQueryStore((s) => s.spotifyQuery);

  const { data: relatedArtists } = useRelatedArtists(artistId);

  const { data: selectedArtist } = useArtist(artistId);

  const allArtists: Artist[] = [];
  if (selectedArtist) allArtists.push(selectedArtist);
  if (relatedArtists) allArtists.push(...relatedArtists);

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
          {getUniqueArtists(allArtists)?.map((artist) => (
            <li key={artist.name}>
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
