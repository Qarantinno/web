import React, { ReactNode } from 'react';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export const LinkButton = ({ to, children }: { to: string, children: ReactNode }) => (
  <Link to={to} style={{ textDecoration: 'none', color: 'black' }}>
    <Button variant="contained" color="inherit">
      {children}
    </Button>
  </Link>
);

export default LinkButton;
