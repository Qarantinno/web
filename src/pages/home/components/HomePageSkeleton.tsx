import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import { Layout } from '../../../components/Layout';

export const HomePageSkeleton = () => (
  <Layout>
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Skeleton variant="rect" width={75} height={30} />
          <Skeleton variant="text" width={60} height={15} />
          <Skeleton variant="text" width={265} height={25} />
        </Box>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <Box display="flex" justifyContent="center">
              <Skeleton variant="rect" width="90%" height={500} />
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="center">
              <Skeleton variant="rect" width={185} height={36} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <Skeleton variant="text" width={352} height={25} />
          </Grid>
          <Grid item>
            <Skeleton variant="circle" width={56} height={56} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Layout>
);
