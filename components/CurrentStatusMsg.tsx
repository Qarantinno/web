import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

import { date } from '../utils/date'
import { Box } from '@material-ui/core';

export const CurrentStatusMsg = () => {
  const initialDate = date();
  const [time, setTime] = useState(initialDate);
  
  function handleClick() {
    const newDate = date();
    setTime(newDate);
  }

  return (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <CheckIcon fontSize="large" fontWeight="bold" />
      </Grid>
      <Grid item>
        <Box textAlign="center">
          <Typography variant="overline" align="center" onClick={handleClick}>
            {time}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography>
            Perfect time for shopping!
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CurrentStatusMsg;
