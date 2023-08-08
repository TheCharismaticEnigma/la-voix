// Serves as a Wrapper for all the components.

import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode | ReactNode[];
}
const Wrapper = ({ children }: Props) => {
  return (
    <Box
      background={'gray.900'}
      padding={'1rem 0.5rem'}
      height={'100vh'}
      borderRadius={'10px '}
      marginRight={'3px '}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
