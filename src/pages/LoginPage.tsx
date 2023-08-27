import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import spotifyLogo from '../assets/spotifyLogo.svg';
import loginWithSpotify from '../utils/loginWithSpotify';

const LoginPage = () => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      width={'100vw'}
      // backgroundImage={background}
      backgroundSize={'cover'}
      background={
        'linear-gradient(120.8deg, rgba(205,49,49,1) 0%, rgba(98,98,98,1) 67%)'
      }
    >
      <Box
        style={{
          overflow: 'hidden',
          borderRadius: '24px',
          boxShadow: '0 0.5px 5px 0 black',
        }}
        padding={'2rem'}
        background={'inherit'}
        border={'1px solid inherit  '}
      >
        <Card
          border={'2px solid transparent'}
          direction={'column'}
          alignItems={'center'}
          justify={'space-between'}
          width={'37rem'}
          padding={'1rem 0 '}
          borderRadius={'15px'}
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
                WE DO NOT STORE YOUR PERSONAL DATA.
              </Text>

              <Link
                to={'/'}
                onClick={() => {
                  loginWithSpotify();
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
