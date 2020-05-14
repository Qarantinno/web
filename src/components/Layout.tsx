import React, { ReactNode } from 'react';

import Box from "@material-ui/core/Box";

export const Layout = ({ children }: { children: ReactNode }) => (
  <Box height={1}>{children}</Box>
);

export default Layout;
