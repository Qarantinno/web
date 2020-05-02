import React, { useState } from "react";

import { useTranslation } from 'react-i18next';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

import { date } from "../../../utils/date";
import { Statuses } from '../../../enums/Statuses';

import { Emoji } from './Emoji';
import { STATUS_TO_EMOJI } from '../../../constants/STATUS_TO_EMOJI';

export interface IStatusProps {
  status: Statuses;
}

export const Status = ({ status }: IStatusProps) => {
  const initialDate = date();
  const [time, setTime] = useState(initialDate);
  const { t } = useTranslation();

  function handleClick() {
    const newDate = date();
    setTime(newDate);
  }
  
  const symbol = STATUS_TO_EMOJI[status] || '🤷‍♂️';

  return (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <Box fontSize="large">
          <Emoji label={status} symbol={symbol} />
        </Box>
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
        <Typography align="center">{t("status-perfect")}</Typography>
      </Grid>
    </Grid>
  );
};

export default Status;
