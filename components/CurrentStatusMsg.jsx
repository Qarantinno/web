import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";

import { date } from "../utils/date";

export const CurrentStatusMsg = ({ text }) => {
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
        <Typography
          display="block"
          variant="overline"
          align="center"
          onClick={handleClick}
        >
          {time}
        </Typography>
        <Typography align="center">{text}</Typography>
      </Grid>
    </Grid>
  );
};

export default CurrentStatusMsg;
