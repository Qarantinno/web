import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export const MainActionBtn = () => (
  <Grid container justify="center" alignItems="center" spacing={2}>
    <Grid item>
      <Typography>I'm shopping now, Share my experience</Typography>
    </Grid>
    <Grid item>
      <Fab color="primary" aria-label="add" size="large">
        <AddIcon fontSize="large" />
      </Fab>
    </Grid>
  </Grid>
);

export default MainActionBtn;
