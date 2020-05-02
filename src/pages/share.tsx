import React, { useState } from "react";

import { useTranslation } from 'react-i18next';

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Layout from "../components/Layout";
import ReturnToMainPageBtn from "../components/ReturnToMainPageBtn";
import PlaceKindSelector from "../components/PlaceKindSelector";
import CrowdLevelSlider from "../components/CrowdLevelSlider";
import { PLACE_KINDS } from "../constants/PLACE_KINDS";

export const Share = () => {
  const [placeKind, setPlaceKind] = useState<string>("mini");
  const [crowdLevel, setCrowdLevel] = useState<number>(50);

  const { t } = useTranslation();

  function handlePlaceKindChanged(kind: string) {
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
              {t("btn-label-post")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Share;
