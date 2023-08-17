// Renders a list of tracks.

import { Flex, Box, Divider } from '@chakra-ui/react';

import { SimplifiedTrack } from '../entities/Album';
import { Track } from '../entities/Track';

import TrackListItem from './TrackListItem';

interface TrackListProps {
  tracks: Track[] | SimplifiedTrack[];
}

const TrackList = ({ tracks }: TrackListProps) => {
  return (
    <Flex
      width={'100%'}
      //   background={'inherit'}
      padding={'inherit'}
      borderRadius={'inherit'}
      direction="column"
      gap={'2rem'}
      background={
        'linear-gradient(120.8deg, rgba(205,49,49,1) 0%, rgba(38,38,38,1) 67%)'
      }
    >
      <Divider background={'inherit'} />

      <Flex
        width={'100% '}
        as="ul"
        direction={'column'}
        gap={'1rem'}
        alignItems={'center'}
        borderRadius={'inherit'}
      >
        {tracks.map((track, index) => (
          <Box as="li" key={index} width={'100%'}>
            <TrackListItem track={track} serialNumber={index + 1} />
          </Box>
        ))}
      </Flex>

      <Divider background={'inherit'} />
    </Flex>
  );
};

export default TrackList;
