import React from 'react';

import { NextPage } from 'next';

import Grid from '@material-ui/core/Grid';
import MainChart from '../components/MainChart';
import MainActionBtn from '../components/MainActionBtn';
import StatusMessage from '../components/StatusMessage';
import Layout from '../components/Layout';

export const Home: NextPage = () => (
  <Layout>
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <StatusMessage />
      </Grid>
      <Grid item>
        <MainChart />
      </Grid>
      <Grid item>
        <MainActionBtn />
      </Grid>
    </Grid>
  </Layout>
);

export default Home;
