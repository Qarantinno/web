import React, { ChangeEvent, useState } from "react";

import { NextPage } from "next";

import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import ReturnToMainPageBtn from "../components/ReturnToMainPageBtn";
import Layout from "../components/Layout";
import { PLACE_KINDS } from "../constants/PLACE_KINDS";
import { PlaceModifier } from "../enums/PlaceModifier";
import { WeekDay } from "../enums/WeekDay";
import { WEEK_DAYS } from "../constants/WEEK_DAYS";

export const Statistic: NextPage = () => {
  const [placeModifier, setPlaceModifier] = useState(PlaceModifier.ANY);
  const [weekDay, setWeekDay] = useState(WeekDay.ANY);

  function handlePlaceModifierChanged({
    target,
  }: ChangeEvent<{ value: PlaceModifier }>) {
    setPlaceModifier(target.value);
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
          <FormControl fullWidth>
            <InputLabel id="place-kind-label">The place kind</InputLabel>
            <Select
              labelId="place-kind-label"
              onChange={handlePlaceModifierChanged}
              value={placeModifier}
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
          <FormControl fullWidth>
            <InputLabel id="week-day-label">Week day</InputLabel>
            <Select
              labelId="week-day-label"
              onChange={handleWeekDayChanged}
              value={weekDay}
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
      </Grid>
    </Layout>
  );
};

export default Statistic;
