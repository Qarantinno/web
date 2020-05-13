import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { CrowdChart } from '../../components/CrowdChart';
import { Layout } from '../../components/Layout';

import { Statuses } from '../../enums/Statuses';
import { Status } from './components/Status';
import { getRelativeStats, getStatusFromStats, IHourStats } from '../../services/status';
import { useInterval } from '../../utils/useInterval';

export const HomePage = () => {
  const [stats, setStats] = useState<IHourStats[]>([]);
  const [status, setStatus] = useState<Statuses>();
  const { t } = useTranslation();

  useInterval(() => {
    getRelativeStats({ from: -2, to: 3 }).then(setStats);
  }, 60000);
  
  useEffect(() => {
    setStatus(getStatusFromStats(stats));
  }, [stats]);
  
  return (
    <Layout>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <Status status={status} />
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center" spacing={5}>
            <Grid item style={{ width: "100%" }}>
              <CrowdChart data={stats} />
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/statistic" underline="none">
                <Button variant="contained" color="default">
                  {t("btn-label-discover")}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography>{t("msg-do-share")}</Typography>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/share" underline="none">
                <Fab color="primary" aria-label="add" size="large">
                  <AddIcon fontSize="large" />
                </Fab>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default HomePage;
