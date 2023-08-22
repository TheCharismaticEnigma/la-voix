import getPkce from 'oauth-pkce';

interface PkceCredentials {
  code_verifier: string;
  code_challenge: string;
}

const generatePKCECredentials = async () => {
  return new Promise<PkceCredentials>((resolve, reject) => {
    getPkce(128, (error, { verifier, challenge }) => {
      if (error) reject(error);

      if (!error) {
        resolve({ code_verifier: verifier, code_challenge: challenge });
      }
    });
  });
};

export default generatePKCECredentials;

/* 

const redirectUri = 'http://localhost:5173';
const state = generateRandomString(16);

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

      window.location.replace('https://accounts.spotify.com/authorize?' + args);

*/
