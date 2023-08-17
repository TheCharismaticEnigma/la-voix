import { Flex, Text } from '@chakra-ui/react';
import ms from 'ms';
import { Track } from '../entities/Track';
import useSpotifyQueryStore from '../store';
import { SimplifiedTrack } from '../entities/Album';
interface Props {
  track: Track | SimplifiedTrack;
  serialNumber: number;
}

const TrackListItem = ({ track, serialNumber }: Props) => {
  const { setSelectedAlbumId, setSelectedTrackId } = useSpotifyQueryStore();

  return (
    <Flex
      onClick={() => {
        //   console.log(track.name, '=>', track.id);
        setSelectedTrackId(track.id);

        if (track.album) setSelectedAlbumId(track.album.id);
        //   console.log(track);
      }}
      padding={'8px 12px '}
      height={'5.5rem'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderRadius={'10px'}
      cursor={'pointer'}
      _hover={{
        backgroundColor: 'rgba(255,255,255,0.3)',
        backdropFilter: 'blur(5px)',
        color: 'black',
        // backgroundColor: 'gray.600',
      }}
    >
      <Text fontSize={'1.9rem'} width={'3rem'} textAlign={'center'}>
        {serialNumber}
        {'.'}
      </Text>

      <Text
        textAlign={'center'}
        fontFamily={'system'}
        fontSize={'2.2rem'}
        variant={'outline'}
        width="max(50%, fit-content)"
        _hover={{
          textDecoration: 'underline',
          textShadow: '0 0 4px inherit ',
          //   textShadow: '0 0 4px #1ED760 ',
          color: 'black ',
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

export default TrackListItem;

// Bank account is looking slim.
