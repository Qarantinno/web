import React, { useState } from 'react';

import { NextPage } from 'next';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Layout from '../components/Layout';
import ReturnToMainPageBtn from '../components/ReturnToMainPageBtn';
import PlaceKindSelector from '../components/PlaceKindSelector';
import CrowdLevelSlider from '../components/CrowdLevelSlider';
import { IPlaceKind } from '../interfaces/IPlaceKind';
import { placeKinds } from '../constants/place-kinds';

export const Share: NextPage = () => {
  const [ placeKind, setPlaceKind ] = useState(undefined);
  const [ crowdLevel, setCrowdLevel ] = useState(undefined);
  
  function handlePlaceKindChanged(kind: IPlaceKind) {
    setPlaceKind(kind)
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
          <PlaceKindSelector placeKinds={placeKinds} defaultSelected={placeKind} onChange={handlePlaceKindChanged}/>
        </Grid>
        <Grid item>
          <CrowdLevelSlider onChange={handleCrowdLevelChanged} defaultValue={crowdLevel} />
        </Grid>
        <Grid item>
          <Button size='large' variant="contained" color="primary" disabled={!placeKind}>
            Post
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Share;
