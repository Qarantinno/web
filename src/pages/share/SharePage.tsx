import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Layout } from '../../components/Layout';
import { CrowdLevelSlider } from '../statistic/components/CrowdLevelSlider';
import { PLACE_SIZES } from '../../constants/PLACE_SIZES';
import { PlaceSizes } from '../../enums/PlaceSizes';

import { PlaceSizeSelector } from './components/PlaceSizeSelector';

export const SharePage = () => {
  const [placeKind, setPlaceKind] = useState<PlaceSizes>(PlaceSizes.MINI);
  const [crowdLevel, setCrowdLevel] = useState<number>(50);

  const { t } = useTranslation();

  function handlePlaceKindChanged(kind: PlaceSizes) {
    setPlaceKind(kind);
  }

  function handleCrowdLevelChanged(level: number) {
    setCrowdLevel(level);
  }

  return (
    <Layout>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <Link to="/">
            <Fab color="primary" aria-label="add" size="large">
              <ArrowBack fontSize="large" />
            </Fab>
          </Link>
        </Grid>
        <Grid item>
          <PlaceSizeSelector
            sizes={PLACE_SIZES}
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

export default SharePage;
