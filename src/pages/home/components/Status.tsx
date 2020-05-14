import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { Emoji } from './Emoji';

import { Statuses } from '../../../enums/Statuses';
import { STATUS_TO_EMOJI } from '../../../constants/STATUS_TO_EMOJI';

export interface IStatusProps {
  status: Statuses | undefined;
}

export const Status = ({ status }: IStatusProps) => {
  if (!status) status = Statuses.PERFECT;

  const initialDate = dayjs().format('HH:mm');
  const [time, setTime] = useState(initialDate);
  const { t } = useTranslation();

  useEffect(() => setTime(dayjs().format('HH:mm')), [status]);

  const symbol = STATUS_TO_EMOJI[status];

  return (
    <Box>
      <Box textAlign="center">
        <Emoji label={status} symbol={symbol} />
      </Box>
      <Typography display="block" variant="overline" align="center">
        {time}
      </Typography>
      <Typography align="center">{t(`status-${status}`)}</Typography>
    </Box>
  );
};

export default Status;
