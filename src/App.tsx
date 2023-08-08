import { useEffect } from 'react';
import HttpService from './services/HttpService';
import useAccessToken from './hooks/useAccessToken';

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

  return <div> {accessToken} </div>;
};

export default App;
