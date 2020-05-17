import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { ChartPoint } from "chart.js";

import dayjs from "dayjs";

import Axios from 'axios';

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import { CrowdChart } from "../../components/CrowdChart";
import { Layout } from "../../components/Layout";
import { Statuses } from "../../enums/Statuses";
import { fetchRelativeStats } from "../../services/status/fetchRelativeStats";
import { getStatusFromStats } from "../../services/status/utils/getStatusFromStats";
import { getChartDataFromStats } from "../../services/status/utils/getChartDataFromStats";
import { IParsedStats } from "../../services/status/interfaces/IStats";

import { Status } from "./components/Status";
import { CancelToken } from '../../utils/httpClient';

export const HomePage = () => {
  const [stats, setStats] = useState<IParsedStats[]>([]);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [status, setStatus] = useState<Statuses>(Statuses.UNDEFINED);
  const [timer, setTimer] = useState(dayjs().minute(0).millisecond(0));
  const { t } = useTranslation();

  useEffect(() => {
    const cancelToken = CancelToken.source();

    fetchRelativeStats({
      from: timer.subtract(5, "hour"),
      to: timer.add(5, "hour"),
    }, cancelToken.token).then((data) => {
      setStats(data);
      setTimeout(() => {
        setTimer(dayjs().minute(0).millisecond(0));
      }, 60000);
    }).catch((error) => {
      if (Axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        throw error;
      }
    });

    return () => {
      cancelToken.cancel('Leave the home page')
    };
  }, [timer]);

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
};

export default HomePage;
