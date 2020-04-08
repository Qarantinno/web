import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import CustomHead from '../components/CustomHead';
import MainChart from '../components/MainChart';
import MainActionBtn from '../components/MainActionBtn';
import StatusMessage from '../components/StatusMessage';

export const Home = () => (
  <div className="container">
    <CustomHead />

    <Container maxWidth="sm">
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
    </Container>
  </div>
);

export default Home;
