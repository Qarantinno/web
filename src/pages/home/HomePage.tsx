import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { ChartPoint } from 'chart.js';

import dayjs from 'dayjs';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { CrowdChart } from '../../components/CrowdChart';
import { Status } from './components/Status';

import { Layout } from '../../components/Layout';
import { Statuses } from '../../enums/Statuses';
import { getRelativeStats, getStatusFromStats, getChartDataFromStats, IHourStats } from '../../services/status';
import { useInterval } from '../../utils/useInterval';

export const HomePage = () => {
  const [stats, setStats] = useState<IHourStats[]>([]);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [status, setStatus] = useState<Statuses>(Statuses.UNDEFINED);
  const { t } = useTranslation();

  useInterval(() => {
    getRelativeStats({ 
      from: dayjs().subtract(3, 'hour'),
      to: dayjs().add(3, 'hour'), 
    }).then(setStats);
  }, 60000);
  
  useEffect(() => {
    setStatus(getStatusFromStats(stats));
    setChartData(getChartDataFromStats(stats));
  }, [stats]);
  
  return (
    <Layout>
      <Status status={status} />
      <Box>
        <Box p={1}>
          <CrowdChart data={chartData} />
        </Box>
        <Box p={1} textAlign="center">
          <Link component={RouterLink} to="/statistic" underline="none">
            <Button variant="contained" color="default">
              {t("btn-label-discover")}
            </Button>
          </Link>
        </Box>
      </Box>
      <Box textAlign="center">
        <Box p={2}>
          <Typography>{t("msg-do-share")}</Typography>
        </Box>
        <Link component={RouterLink} to="/share" underline="none">
          <Fab color="primary" aria-label="add" size="large">
            <AddIcon fontSize="large" />
          </Fab>
        </Link>
      </Box>
    </Layout>
  );
}

export default HomePage;
