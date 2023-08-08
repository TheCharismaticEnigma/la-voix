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
      height={'100%'}
      width={'100%'}
      overflow={'hidden auto'}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
