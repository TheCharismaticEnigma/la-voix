import {
  Image,
  Text,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  Button,
  Box,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import spotifyLogo from '../assets/spotifyLogo.svg';
import loginWithSpotify from '../utils/loginWithSpotify';
import background from '../assets/background.png';

const LoginPage = () => {
  // const redirectUri = 'http://localhost:5173/';
  // const redirectUri = 'https://la-voix.vercel.app/';

  /*
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
  */

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      width={'100vw'}
      backgroundImage={background}
      backgroundSize={'cover'}
    >
      <Box
        style={{
          overflow: 'hidden',
          borderRadius: '24px',
          boxShadow: '0 0.5px 5px 0 black',
        }}
        padding={'2rem'}
        background={'inherit'}
      >
        <Card
          border={'1px solid transparent'}
          direction={'column'}
          alignItems={'center'}
          justify={'space-between'}
          width={'37rem'}
          padding={'1rem 0 '}
          borderRadius={'15px'}
          backdropFilter={'blur(1rem)'}
        >
          <CardHeader>
            <Image src={spotifyLogo} />
          </CardHeader>

          <CardBody color={'black'}>
            <Stack spacing={4} alignItems={'center'} gap={'3rem'}>
              <Heading textAlign={'center'} size={'4xl'} fontFamily={'system'}>
                LOGIN USING SPOTIFY
              </Heading>
              <Text fontWeight={'500'} textAlign={'center'} fontSize={'2rem'}>
                WE DO NOT ACCESS OR SAVE YOUR PERSONAL DATA.
              </Text>

              <Link
                to={'/'}
                onClick={() => {
                  loginWithSpotify();
                  console.log(localStorage.getItem('logged_in'));
                }}
              >
                <Button
                  _hover={{
                    color: 'black',
                    transform: ' translateY(-5%) scale(1.05)',
                  }}
                  transition={'all 200ms ease-out'}
                  colorScheme="green"
                  borderRadius={'35px'}
                  fontSize={'2rem'}
                  padding={'1.5em 1.75em '}
                >
                  LOGIN
                </Button>
              </Link>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
};

export default LoginPage;
