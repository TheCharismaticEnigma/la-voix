import generatePKCECredentials from '../auth/generatePKCECredentials';
import { generateRandomString } from '../auth/generateRandomString';
import { CLIENT_ID } from './credentials';

const loginWithSpotify = () => {
  // const redirectUri = 'https://la-voix.vercel.app/';
  // const redirectUri = 'http://localhost:5173/';
  const redirectUri = 'https://la-voix-6552e.web.app/';

  localStorage.clear(); // clear anything that exists before.

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

    // using replace() the current page will not be saved in session History ,
    // meaning the user won't be able to use the back button to navigate to it

    window.location.replace('https://accounts.spotify.com/authorize?' + args);
  });
};

export default loginWithSpotify;
