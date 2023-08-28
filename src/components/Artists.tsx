import { Flex } from '@chakra-ui/react';
import { Artist } from '../entities/Artist';
import useArtist from '../hooks/useArtist';
import useRelatedArtists from '../hooks/useRelatedArtists';
import useSpotifyQueryStore from '../store';
import getUniqueArtists from '../utils/getUniqueArtists';
import ArtistListBar from './ArtistListBar';
import Wrapper from './Wrapper';
import { initialArtists } from '../initialData/initialArtists';
import ArtistListBarSkeleton from '../skeletons/ArtistListBarSkeleton';

const Artists = () => {
  const { artistId } = useSpotifyQueryStore((s) => s.spotifyQuery);

  const {
    data: relatedArtists,
    error: relatedArtistsError,
    isLoading: relatedArtistsAreLoading,
  } = useRelatedArtists(artistId);

  const { data: selectedArtist, isLoading: artistIsLoading } =
    useArtist(artistId);

  let artists: Artist[] = [];
  if (selectedArtist && relatedArtists)
    artists = [...getUniqueArtists(selectedArtist, relatedArtists)];

  if (relatedArtistsError) artists = initialArtists;

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
          {(relatedArtistsAreLoading || artistIsLoading) &&
            skeletons.map((skeleton) => (
              <ArtistListBarSkeleton key={skeleton} />
            ))}

          {artists?.map((artist) => (
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
