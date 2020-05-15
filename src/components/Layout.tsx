import React, { ReactNode } from 'react';

import Container from '@material-ui/core/Container';

import FullHeight from 'react-div-100vh';

export const Layout = ({ children }: { children: ReactNode }) => (
  <Container>
    <FullHeight>
      {children}
    </FullHeight>
  </Container>
);

export default Layout;
