import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import Wrapper from './components/Wrapper';
import useAccessToken from './hooks/useAccessToken';
import HttpService from './services/HttpService';

interface Track {
  name: string;
  id: string;
  type: 'track';
  is_playable: boolean;
}

const App = () => {
  const id = '7D7KjOOyVsPaxo7evQp6ML';
  const { data: accessToken, error } = useAccessToken();

  if (error) throw error; // Rethrow so that router can catch it.

  const trackService = new HttpService<Track>(`/tracks/${id}`, accessToken!); // telling compiler that accessToken can't be undefined.

  useEffect(() => {
    const response = trackService.get();
    console.log(response);
  }, []);

  return (
    <Wrapper>
      <Flex
        background={'gray.700'}
        height={'100%'}
        width={'100%'}
        borderRadius={'inherit'}
        padding={'8px 12px'}
      >
        {accessToken}
      </Flex>
    </Wrapper>
  );
};

export default App;

// For Components => gray.700
