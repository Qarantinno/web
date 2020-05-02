import React, { ChangeEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Layout from "../components/Layout";
import ReturnToMainPageBtn from "../components/ReturnToMainPageBtn";
import CrowdChart from "../components/CrowdChart";
import { PLACE_KINDS } from "../constants/PLACE_KINDS";
import { WEEK_DAYS } from "../constants/WEEK_DAYS";

export const Statistic = () => {
  const [placeKind, setPlaceKind] = useState("any");
  const [weekDay, setWeekDay] = useState("any");

  const { t } = useTranslation();

  function handlePlaceKindChanged({ target }: ChangeEvent<{ name?: string | undefined, value: unknown }>) {
    setPlaceKind(target.value as string);
  }

  function handleWeekDayChanged({ target }: ChangeEvent<{ name?: string | undefined, value: unknown }>) {
    setWeekDay(target.value as string);
  }

  return (
    <Layout>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <ReturnToMainPageBtn />
        </Grid>
        <Grid item>
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
              {PLACE_KINDS.map((place) => (
                <MenuItem key={place} value={place}>
                  {t(`option-modifier-${place}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <CrowdChart />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Statistic;