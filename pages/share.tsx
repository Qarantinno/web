import React, { useState } from "react";

import { NextPage } from "next";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Layout from "../components/Layout";
import ReturnToMainPageBtn from "../components/ReturnToMainPageBtn";
import PlaceKindSelector from "../components/PlaceKindSelector";
import CrowdLevelSlider from "../components/CrowdLevelSlider";
import { PLACE_KINDS } from "../constants/PLACE_KINDS";
import { PlaceModifier } from "../enums/PlaceModifier";
import Box from "@material-ui/core/Box";

export const Share: NextPage = () => {
  const [placeKind, setPlaceKind] = useState(PlaceModifier.MINI);
  const [crowdLevel, setCrowdLevel] = useState(50);

  function handlePlaceKindChanged(kind: PlaceModifier) {
    setPlaceKind(kind);
  }

  function handleCrowdLevelChanged(level: number) {
    setCrowdLevel(level);
  }

  return (
    <Layout>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <ReturnToMainPageBtn />
        </Grid>
        <Grid item>
          <PlaceKindSelector
            kinds={PLACE_KINDS}
            selected={placeKind}
            onChange={handlePlaceKindChanged}
          />
        </Grid>
        <Grid item>
          <CrowdLevelSlider
            value={crowdLevel}
            onChange={handleCrowdLevelChanged}
          />
        </Grid>
        <Grid item>
          <Box justifyContent="center" display="flex">
            <Button size="large" variant="contained" color="primary">
              Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Share;
