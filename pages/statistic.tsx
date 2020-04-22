import React  from 'react';

import { NextPage } from 'next';

import Grid from '@material-ui/core/Grid';

import Layout from '../components/Layout';
import ReturnToMainPageBtn from '../components/ReturnToMainPageBtn';

export const Statistic: NextPage = () => {
  return (
    <Layout>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <ReturnToMainPageBtn />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Statistic;
