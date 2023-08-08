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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
      <Box
        style={{
          overflow: 'hidden',
          borderRadius: '24px',
          boxShadow: '0 2px 5px 0 rgba(255,255,255,0.2)',
        }}
        padding={'4rem'}
      >
        <Card
          direction={'column'}
          alignItems={'center'}
          justify={'space-between'}
          width={'37rem'}
          padding={'1rem 0 '}
        >
          <CardHeader>
            <Heading textAlign={'center'} fontSize={'10rem'}>
              404
            </Heading>
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
                    background: `#262626`,
                    color: 'black',
                    backgroundColor: '#1DB954',
                    transform: ' translateY(-5%) scale(1.05)',
                  }}
                  transition={'all 200ms ease-out'}
                  colorScheme="yellow"
                  borderRadius={'35px '}
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
