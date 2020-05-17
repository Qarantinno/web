import React, { ChangeEvent, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { ChartPoint } from "chart.js";

import { useTranslation } from "react-i18next";

import Fab from "@material-ui/core/Fab";
import ArrowBack from "@material-ui/icons/ArrowBack";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";

import dayjs from "dayjs";

import { CrowdChart } from "../../components/CrowdChart";
import { Layout } from "../../components/Layout";

import { PLACE_SIZES } from "../../constants/PLACE_SIZES";
import { WEEK_DAYS } from "../../constants/WEEK_DAYS";
import { fetchStats } from "../../services/status/fetchStats";
import { getChartDataFromStats } from "../../services/status/utils/getChartDataFromStats";
import { IParsedStats } from "../../services/status/interfaces/IStats";
import { PlaceSizes } from "../../enums/PlaceSizes";
import { WeekDays } from "../../enums/WeekDays";
import { CancelToken } from '../../utils/httpClient';
import Axios from 'axios';

export const StatisticPage = () => {
  const [stats, setStats] = useState<IParsedStats[]>([]);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [placeSize, setPlaceSize] = useState<PlaceSizes>(PlaceSizes.ANY);
  const [weekDay, setWeekDay] = useState<WeekDays>(WeekDays.ANY);

  const { t } = useTranslation();

  useEffect(() => {
    const cancelToken = CancelToken.source()

    fetchStats({
      moment: dayjs().toISOString(),
      placeModifier: placeSize,
      weekDay: weekDay,
    }, cancelToken.token).then(setStats).catch((error) => {
      if (Axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        throw error;
      }
    });
    
    return () => {
      cancelToken.cancel('Leave the statistic page')
    };
  }, [placeSize, weekDay]);

  useEffect(() => {
    setChartData(getChartDataFromStats(stats));
  }, [stats]);

  function handlePlaceSizeChanged({
    target,
  }: ChangeEvent<{ name?: string | undefined; value: unknown }>) {
    setPlaceSize(target.value as PlaceSizes);
  }

  function handleWeekDayChanged({
    target,
  }: ChangeEvent<{ name?: string | undefined; value: unknown }>) {
    setWeekDay(target.value as WeekDays);
  }

  return (
    <Layout>
      <Box pt={2}>
        <Link to="/">
          <Fab color="primary" aria-label="add" size="large">
            <ArrowBack fontSize="large" />
          </Fab>
        </Link>
      </Box>
      <Box>
        <Box pt={10} pb={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="place-size-label">
              {t("option-label-modifier")}
            </InputLabel>
            <Select
              id="place-size"
              labelId="place-size-label"
              onChange={handlePlaceSizeChanged}
              value={placeSize}
              label={t("option-label-modifier")}
            >
              <MenuItem value={PlaceSizes.ANY}>
                {t("option-modifier-any")}
              </MenuItem>
              {PLACE_SIZES.map((place) => (
                <MenuItem key={place} value={place}>
                  {t(`option-modifier-${place}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box pt={2} pb={5}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="week-day-label">
              {t("option-label-week-day")}
            </InputLabel>
            <Select
              id="week-day"
              labelId="week-day-label"
              onChange={handleWeekDayChanged}
              value={weekDay}
              label={t("option-label-week-day")}
            >
              <MenuItem value={WeekDays.ANY}>
                {t("option-week-day-any")}
              </MenuItem>
              {WEEK_DAYS.map((weekDay) => (
                <MenuItem key={weekDay} value={weekDay}>
                  {t(`option-week-day-${weekDay}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box height={1}>
        <CrowdChart data={chartData} drag />
      </Box>
    </Layout>
  );
};

export default StatisticPage;
