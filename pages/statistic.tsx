import React, { ChangeEvent, useState } from "react";

import { NextPage } from "next";

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
import { PlaceModifier } from "../enums/PlaceModifier";
import { WeekDay } from "../enums/WeekDay";

export const Statistic: NextPage = () => {
  const [placeKind, setPlaceKind] = useState(PlaceModifier.ANY);
  const [weekDay, setWeekDay] = useState(WeekDay.ANY);

  function handlePlaceKindChanged({
    target,
  }: ChangeEvent<{ value: PlaceModifier }>) {
    setPlaceKind(target.value);
  }

  function handleWeekDayChanged({ target }: ChangeEvent<{ value: WeekDay }>) {
    setWeekDay(target.value);
  }

  return (
    <Layout>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <ReturnToMainPageBtn />
        </Grid>
        <Grid item>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="place-kind-label">The place kind</InputLabel>
            <Select
              id="place-kind"
              labelId="place-kind-label"
              onChange={handlePlaceKindChanged}
              value={placeKind}
              label="The place kind"
            >
              <MenuItem value={PlaceModifier.ANY}>{PlaceModifier.ANY}</MenuItem>
              {PLACE_KINDS.map((place) => (
                <MenuItem key={place} value={place}>
                  {place}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="week-day-label">Week day</InputLabel>
            <Select
              id="week-day"
              labelId="week-day-label"
              onChange={handleWeekDayChanged}
              value={weekDay}
              label="Week day"
            >
              <MenuItem value={WeekDay.ANY}>{PlaceModifier.ANY}</MenuItem>
              {WEEK_DAYS.map((weekDay) => (
                <MenuItem key={weekDay} value={weekDay}>
                  {weekDay}
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
