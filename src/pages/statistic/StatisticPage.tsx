import React, { ChangeEvent, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { CrowdChart } from "../../components/CrowdChart";
import { PLACE_SIZES } from "../../constants/PLACE_SIZES";
import { WEEK_DAYS } from "../../constants/WEEK_DAYS";
import { getStats, IHourStats } from '../../services/status';

export const StatisticPage = () => {
  const [stats, setStats] = useState<IHourStats[]>([]);
  const [placeKind, setPlaceKind] = useState("any");
  const [weekDay, setWeekDay] = useState("any");

  const { t } = useTranslation();
  
  useEffect(() => {
    getStats({
      placeModifier: placeKind,
      weekDay: weekDay,
    }).then(({ data }) => {
      setStats(data.hours);
    });
  }, [placeKind, weekDay]);

  function handlePlaceKindChanged({ target }: ChangeEvent<{ name?: string | undefined, value: unknown }>) {
    setPlaceKind(target.value as string);
  }

  function handleWeekDayChanged({ target }: ChangeEvent<{ name?: string | undefined, value: unknown }>) {
    setWeekDay(target.value as string);
  }

  return (
    <Box height={1} display="grid" gridRowGap={10} gridTemplateRows="0.4fr 0.7fr 1.1fr">
      <Container>
        <Box pt={2}>
          <Link to="/">
            <Fab color="primary" aria-label="add" size="large">
              <ArrowBack fontSize="large" />
            </Fab>
          </Link>
        </Box>
      </Container>
      <Container>
        <Box pt={2} pb={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="place-kind-label">
              {t("option-label-modifier")}
            </InputLabel>
            <Select
              id="place-kind"
              labelId="place-kind-label"
              onChange={handlePlaceKindChanged}
              value={placeKind}
              label={t("option-label-modifier")}
            >
              <MenuItem value="any">{t("option-modifier-any")}</MenuItem>
              {PLACE_SIZES.map((place) => (
                <MenuItem key={place} value={place}>
                  {t(`option-modifier-${place}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box pt={2} pb={2}>
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
              <MenuItem value="any">{t("option-week-day-any")}</MenuItem>
              {WEEK_DAYS.map((weekDay) => (
                <MenuItem key={weekDay} value={weekDay}>
                  {t(`option-week-day-${weekDay}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Container>
      <Container>
        <Box height={1}>
          <Box p={1}>
            <CrowdChart data={stats} zoom drag />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StatisticPage;
