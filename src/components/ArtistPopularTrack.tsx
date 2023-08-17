import { Flex, Text } from '@chakra-ui/react';
import ms from 'ms';
import { Track } from '../entities/Track';
import useSpotifyQueryStore from '../store';
import { SimplifiedTrack } from '../entities/Album';
interface Props {
  track: Track | SimplifiedTrack;
  serialNumber: number;
}

const ArtistPopularTrack = ({ track, serialNumber }: Props) => {
  const { setSelectedAlbumId, setSelectedTrackId } = useSpotifyQueryStore();

  return (
    <Flex
      padding={'8px 12px '}
      height={'5.5rem'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderRadius={'10px'}
      cursor={'pointer'}
      _hover={{
        backgroundColor: 'gray.600',
      }}
    >
      <Text
        color={'whiteAlpha.800'}
        fontSize={'1.9rem'}
        width={'3rem'}
        textAlign={'center'}
      >
        {serialNumber}
        {'.'}
      </Text>

      <Text
        onClick={() => {
          //   console.log(track.name, '=>', track.id);
          setSelectedTrackId(track.id);

          if (track.album) setSelectedAlbumId(track.album.id);
          //   console.log(track);
        }}
        textAlign={'center'}
        fontFamily={'system'}
        fontSize={'2.2rem'}
        variant={'outline'}
        width="max(50%, fit-content)"
        _hover={{
          textDecoration: 'underline',
          textShadow: '0 0 4px #1ED760 ',
        }}
      >
        {track.name}
      </Text>

      <Text
        color={'whiteAlpha.800'}
        width={'5rem'}
        fontSize={'1.5rem'}
        textAlign={'center'}
      >
        {`${ms(track.duration_ms).slice(0, -1)} : 00 `}
      </Text>
    </Flex>
  );
};

export default ArtistPopularTrack;

// Bank account is looking slim.
