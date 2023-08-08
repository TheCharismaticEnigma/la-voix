import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import spotifyLogo from '../assets/spotifyLogo.svg';

const ErrorPage = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
      <Box
        style={{
          overflow: 'hidden',
          borderRadius: '24px',
          boxShadow: '0 0.5px 5px 0 #1DB954',
        }}
        padding={'2rem'}
      >
        <Card
          direction={'column'}
          alignItems={'center'}
          justify={'space-between'}
          width={'37rem'}
          padding={'1rem 0 '}
        >
          <CardHeader>
            <Image src={spotifyLogo} />
          </CardHeader>

          <CardBody>
            <Stack spacing={4} alignItems={'center'} gap={'3rem'}>
              <Heading textAlign={'center'} size={'3xl'}>
                Page Not Found
              </Heading>
              <Text opacity={'0.7'} textAlign={'center'} fontSize={'2rem'}>
                The page you are looking for doesn't exist or has been moved
              </Text>

              <Link to={'/'}>
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
                  Go Home
                </Button>
              </Link>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
};

export default ErrorPage;

// Rethrow error from components, router will catch it and display this.

/*  
import { isRouteErrorResponse } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <div>Oops</div>;
  }
}
*/
