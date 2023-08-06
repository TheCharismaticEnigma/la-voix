import { useEffect } from 'react';
import useAccessToken from './hooks/useAccessToken';
import axios from 'axios';

const App = () => {
  const { data: accessToken, isLoading, error } = useAccessToken();

  useEffect(() => {
    const artistId = '71oGOxg5ez52Hh1Ye41A98?si=Kmp8c1ZxRTSkiqPS6N4n-A';
    axios
      .get(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
      });
  }, []);

  if (isLoading) return null;

  if (error) return null;

  return <div> {accessToken} </div>;
};

export default App;
