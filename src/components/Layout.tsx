import React, { ReactNode } from 'react';

import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';

import FullHeight from 'react-full-height';

const useClasses = makeStyles({
  layout: {
    paddingTop: 20,
    paddingBottom: 20,
    boxSizing: 'content-box',
  },
});

export const Layout = ({ children }: { children: ReactNode }) => {
  const classes = useClasses();

  return (
    <Container>
      <FullHeight className={classes.layout} canExceed={false}>
        {children}
      </FullHeight>
    </Container>
  );
}

export default Layout;
