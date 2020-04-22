import React from 'react';

import { NextPage } from 'next';

import Grid from '@material-ui/core/Grid';

import CurrentCrowdLevelChart from '../components/CurrentCrowdLevelChart';
import ShareCrowdLevelBtn from '../components/ShareCrowdLevelBtn';
import CurrentStatusMsg from '../components/CurrentStatusMsg';
import Layout from '../components/Layout';

export const Home: NextPage = () => (
  <Layout>
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <CurrentStatusMsg />
      </Grid>
      <Grid item>
        <CurrentCrowdLevelChart />
      </Grid>
      <Grid item>
        <ShareCrowdLevelBtn />
      </Grid>
    </Grid>
  </Layout>
);

export default Home;
