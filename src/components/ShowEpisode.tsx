import { Grid, GridItem, Flex, Box, Image, Text } from '@chakra-ui/react';
import ms from 'ms';
import ShowTag from './ShowTag';
import placeholderImage from '../assets/no-image-placeholder.webp';
import { SimplifiedEpisode } from '@spotify/web-api-ts-sdk';

interface Props {
  episode: SimplifiedEpisode;
}

const ShowEpisode = ({ episode }: Props) => {
  return (
    <Grid
      borderTop={`0.5px solid gray`}
      borderBottom={'0.5px solid gray'}
      as={'li'}
      gridTemplateColumns={'125px 1fr'}
      gap={'1.5rem'}
      padding={'20px 15px '}
      cursor={'pointer'}
      _hover={{
        background: `linear-gradient(167deg, rgba(164,52,52,1) 0%, rgba(39,28,28,1) 48%, rgba(0,0,0,1) 100%)`,
        borderTop: `none`,
        borderBottom: 'none',
      }}
    >
      <GridItem alignSelf={'center'}>
        <Box borderRadius={'5px'} overflow={'hidden'} h={'125px'} w={'125px'}>
          <Image
            objectFit={'cover'}
            w={'100%'}
            h={'100%'}
            src={episode?.images[0].url || placeholderImage}
          />
        </Box>
      </GridItem>

      <GridItem alignSelf={'center'} height={'100%'}>
        <Flex
          height={'100% '}
          padding={' 5px '}
          direction={'column'}
          justifyContent={'space-around'}
          gap={'1rem'}
        >
          <Text color={'gray.200'} fontSize={'2rem'}>
            {episode?.name}
          </Text>

          <Flex gap={'2rem '}>
            <ShowTag tagText={`${ms(episode?.duration_ms || 0)}`} />
            <ShowTag tagText={`Released On : ${episode?.release_date}`} />
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ShowEpisode;
