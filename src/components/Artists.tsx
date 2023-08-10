import { useEffect, useState } from 'react';
import { Box, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import useAccessToken from '../hooks/useAccessToken';
import HttpService from '../services/HttpService';
import { Artist } from '../entities/Artist';
import { RelatedArtists } from '../entities/RelatedArtists';
import Wrapper from './Wrapper';

const Artists = () => {
  const [relatedArtists, setRelatedArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  if (error) throw error;

  const token = useAccessToken();
  const arjitSinghId = `4YRxDV8wJFPHPTeXepOstw`;

  useEffect(() => {
    const httpService = new HttpService<RelatedArtists>(
      `/artists/${arjitSinghId}/related-artists`,
      token
    );

    httpService
      .get()
      .then(({ artists }) => {
        setIsLoading(false);
        setRelatedArtists(artists);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

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

          {relatedArtists?.map(({ id, name, images }) => (
            <li key={id}>
              <Flex
                borderRadius={'10px'}
                cursor={'pointer'}
                padding={'5px'}
                gap={'1.5rem'}
                alignItems={'center'}
                _hover={{
                  backgroundColor: '#25252580',
                }}
              >
                <Box
                  height={'5rem'}
                  width={'5rem'}
                  overflow={'hidden'}
                  objectFit={'cover'}
                  borderRadius={'50%'}
                >
                  <Image src={images[0].url} />
                </Box>

                <Text fontWeight={'400'}> {name} </Text>
              </Flex>
            </li>
          ))}
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default Artists;

// Component displays all the related artists.
