import React, { ReactNode } from 'react';

import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "../utils/theme";

export const Layout = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <Container>{children}</Container>
  </ThemeProvider>
);

export default Layout;
