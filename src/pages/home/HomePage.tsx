import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { CrowdChart } from '../../components/CrowdChart';
import { Status } from './components/Status';

import { Statuses } from '../../enums/Statuses';
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
    <Box height={1} display="grid" gridRowGap={10} gridTemplateRows="0.4fr 2fr 0.6fr">
      <Container>
        <Box pt={2}>
          <Status status={status} />
        </Box>
      </Container>
      <Container>
        <Box height={1}>
          <Box p={1}>
            <CrowdChart data={stats} />
          </Box>
          <Box p={1} textAlign="center">
            <Link component={RouterLink} to="/statistic" underline="none">
              <Button variant="contained" color="default">
                {t("btn-label-discover")}
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
      <Container>
        <Box p={1} textAlign="center">
          <Typography>{t("msg-do-share")}</Typography>
        </Box>
        <Box p={1} textAlign="center">
          <Link component={RouterLink} to="/share" underline="none">
            <Fab color="primary" aria-label="add" size="large">
              <AddIcon fontSize="large" />
            </Fab>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
