import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import placeholderImage from '../assets/no-image-placeholder.webp';
import { SpotifyData } from '../pages/HomePage';
import getRequiredData from '../utils/getRequiredData';
import useSpotifyQueryStore from '../store';

interface Props {
  tag: string;
  data: SpotifyData;
}

const QueryCard = ({ tag, data }: Props) => {
  // Link => /type/id
  // If Track add play now.  If artist or album, move to respective page
  const {
    setSelectedAlbumId,
    setSelectedArtistId,
    setSelectedTrackId,
    setSelectedPlaylistId,
    setSelectedShowId,
  } = useSpotifyQueryStore();

  const cardData = getRequiredData(tag, data);

  return (
    <Link
      to={`${cardData?.queryCardLink || ''}`}
      onClick={() => {
        switch (tag) {
          case 'artist': {
            setSelectedArtistId(data.id);
            break;
          }

          case 'album': {
            setSelectedAlbumId(data.id);
            break;
          }

          case 'track': {
            setSelectedTrackId(data.id);

            if (cardData?.trackAlbumId)
              setSelectedAlbumId(cardData.trackAlbumId);

            break;
          }

          case 'playlist': {
            setSelectedPlaylistId(data.id);
            break;
          }

          case 'show': {
            setSelectedShowId(data.id);
            break;
          }
        }
      }}
    >
      <Flex
        background={'gray.600'}
        border={'1px solid transparent'}
        borderRadius={'10px'}
        width={'100%'}
        height={'100%'}
        padding={'10px '}
        direction={'column'}
        gap={'1rem'}
        cursor={'pointer'}
        transition={'all 200ms ease-out'}
        _hover={{ background: '#2a2a2a' }}
      >
        <Box width={'100%'} height={'80%'} borderRadius={'inherit'}>
          <Image
            objectFit={'cover'}
            borderRadius={'inherit'}
            width={'100%'}
            height={'100%'}
            src={cardData?.images[0]?.url || placeholderImage}
          />
        </Box>
        {/*  Detail Container*/}
        <Flex padding={'5px'} direction={'inherit'} gap={'1rem'}>
          <Text
            pointerEvents={'none'}
            fontSize={'2.4rem'}
            fontWeight={'500'}
            fontFamily={'system'}
          >
            {cardData?.name || 'Card Name'}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};

export default QueryCard;
