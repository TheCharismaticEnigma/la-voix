import generatePKCECredentials from '../auth/generatePKCECredentials';
import { useEffect } from 'react';
import { CLIENT_ID } from '../utils/credentials';
import { generateRandomString } from '../auth/generateRandomString';

const LoginPage = () => {
  // const redirectUri = 'http://localhost:5173/';
  const redirectUri = 'https://la-voix.vercel.app/';

  useEffect(() => {
    if (
      !localStorage.getItem('logged_in') &&
      !localStorage.getItem('code_verifier')
    ) {
      const scope =
        'user-read-private user-read-email user-read-currently-playing user-read-playback-state user-modify-playback-state ';

      const state = generateRandomString(16);

      generatePKCECredentials().then(({ code_verifier, code_challenge }) => {
        localStorage.setItem('logged_in', 'true');
        localStorage.setItem('code_verifier', code_verifier);

        const args = new URLSearchParams({
          response_type: 'code',
          client_id: CLIENT_ID,
          scope: scope,
          redirect_uri: redirectUri,
          state: state,
          code_challenge_method: 'S256',
          code_challenge: code_challenge,
        });

        // Navigate to the URL (assing saves history. Replace doesn't)
        // window.location.assign('https://accounts.spotify.com/authorize?' + args);
        window.location.replace(
          'https://accounts.spotify.com/authorize?' + args
        );
      });
    }
  }, []);

  return <div>.</div>;
};

export default LoginPage;
