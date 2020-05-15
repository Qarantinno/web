import React, { ReactNode } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import FullHeight from 'react-full-height';

const useClasses = makeStyles({
  layout: {
    paddingTop: 20,
    paddingBottom: 20
  },
});

export const Layout = ({ children }: { children: ReactNode }) => {
  const classes = useClasses();

  return (
    <FullHeight className={classes.layout} canExceed={false}>
      {children}
    </FullHeight>
  );
}

export default Layout;
