import React from 'react';

import Head from 'next/head';

import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../utils/theme';

export const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Head>
      <title>Quarantine</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Container>
      {children}
    </Container>
  </ThemeProvider>
)

export default Layout;
