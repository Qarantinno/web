import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { date } from '../../../utils/date';
import { Statuses } from '../../../enums/Statuses';

import { Emoji } from './Emoji';
import { STATUS_TO_EMOJI } from '../../../constants/STATUS_TO_EMOJI';

export interface IStatusProps {
  status: Statuses | undefined;
}

export const Status = ({ status }: IStatusProps) => {
  if (!status) status = Statuses.PERFECT;

  const initialDate = date();
  const [time, setTime] = useState(initialDate);
  const { t } = useTranslation();

  useEffect(() => setTime(date()), [status])

  const symbol = STATUS_TO_EMOJI[status];

  return (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <Emoji label={status} symbol={symbol} />
      </Grid>
      <Grid item>
        <Typography
          display="block"
          variant="overline"
          align="center"
        >
          {time}
        </Typography>
        <Typography align="center">{t(`status-${status}`)}</Typography>
      </Grid>
    </Grid>
  );
};

export default Status;
