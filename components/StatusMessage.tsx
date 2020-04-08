import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';

const timeOptions = { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false };
const initialTime = new Date().toLocaleDateString('en-US', timeOptions);

export const StatusMessage = () => {
  const [time, setTime] = useState(initialTime);

  return (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <CheckIcon fontSize="large" fontWeight="bold" />
      </Grid>
      <Grid item>
        <Typography variant="overline" align="center" onClick={() => setTime(new Date().toLocaleDateString('en-US', timeOptions))}>{ time }</Typography>
        <Typography>That’s a nice time for shopping!</Typography>
      </Grid>
    </Grid>
  );
}

export default StatusMessage;
