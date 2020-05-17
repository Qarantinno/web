import React, { ReactNode } from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import FullHeight from 'react-div-100vh';
import useTheme from '@material-ui/core/styles/useTheme';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { palette } = useTheme();
  return (
    <Box bgcolor={palette.background.default} color={palette.getContrastText(palette.background.default)}>
      <Container>
        <FullHeight>
          <Box height={1} display="flex" flexDirection="column" justifyContent="space-around">
            {children}
          </Box>
        </FullHeight>
      </Container>
    </Box>
  );
}

export default Layout;
