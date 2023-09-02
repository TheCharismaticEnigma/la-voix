import { Flex, Text } from '@chakra-ui/react';
import { PlaylistedTrack } from '@spotify/web-api-ts-sdk';
import ms from 'ms';
import useSpotifyQueryStore from '../store';
import { isTrack } from '../utils/spotifyDataTypeGuards';

interface Props {
  playlistedTrack: PlaylistedTrack;
  serialNumber: number;
}

const TrackListItem = ({ playlistedTrack, serialNumber }: Props) => {
  const { setSelectedAlbumId, setSelectedTrackId, setSelectedArtistId } =
    useSpotifyQueryStore();
  const { track } = playlistedTrack;
  const isATrack = isTrack(track);

  if (!isATrack || (isATrack && track.preview_url === null)) return null;

  return (
    <Flex
      onClick={() => {
        //   console.log(track.name, '=>', track.id);
        setSelectedTrackId(track.id);

        if (track.album) setSelectedAlbumId(track.album.id);

        if (track.artists[0]) setSelectedArtistId(track.artists[0].id);
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
        backdropFilter: 'blur(55px)',
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
