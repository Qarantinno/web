import React, { ReactNode } from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import FullHeight from 'react-div-100vh';

export const Layout = ({ children }: { children: ReactNode }) => (
  <Container>
    <FullHeight>
      <Box height={1} display="flex" flexDirection="column" justifyContent="space-around">
        {children}
      </Box>
    </FullHeight>
  </Container>
);

export default Layout;
