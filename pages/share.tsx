import React, { ChangeEvent, useState } from 'react';

import { NextPage } from 'next';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PlaceSelector from '../components/PlaceSelector';
import Layout from '../components/Layout';
import ReturnToMainPageBtn from '../components/ReturnToMainPageBtn';
import PlaceKindSelector from '../components/PlaceKindSelector';
import CrowdLevelSlider from '../components/CrowdLevelSlider';
import { IPlace } from '../interfaces/IPlace';
import { IPlaceKind } from '../interfaces/IPlaceKind';
import { placeKinds } from '../constants/place-kinds';

export interface IShareProps {
  places: IPlace[]
}

export const Share: NextPage<IShareProps> = ({ places }) => {
  const [ place, setPlace ] = useState(places[0]);
  const [ placeKind, setPlaceKind ] = useState(undefined);
  const [ comment, setComment ] = useState('');
  const [ crowdLevel, setCrowdLevel ] = useState(undefined);

  function handlePlaceChanged(selected: IPlace) {
    setPlace(selected);
  }
  
  function handlePlaceKindChanged(kind: IPlaceKind) {
    setPlaceKind(kind)
  }
  
  function handleCommentChanged({ target }: ChangeEvent<{ value: string }>) {
    setComment(target.value);
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
          <PlaceSelector onChange={handlePlaceChanged} selected={place} places={places}/>
        </Grid>
        <Grid item>
          <PlaceKindSelector placeKinds={placeKinds} defaultSelected={placeKind} onChange={handlePlaceKindChanged}/>
        </Grid>
        <Grid item>
          <CrowdLevelSlider onChange={handleCrowdLevelChanged} />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="Add a comment"
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChanged}
          />
        </Grid>
        <Grid item>
          <Button size='large' variant="contained" color="primary" disabled={!(placeKind && place)}>
            Post
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}

Share.getInitialProps = async () => {
  const res = await new Promise<{ json: () => IPlace[] }>((resolve) => {
    resolve({
      json: function () {
        return [
          {
            "id": 4,
            "name": "Green",
            "type": "product",
            "modifier": "super",
            "address": "Минск ул.Петра Глебки 5",
            "coordinate": {
              "id": 3,
              "lat": 53.90827480000001,
              "lng": 27.4697201
            }
          },
          {
            "id": 5,
            "name": "ProStore",
            "type": "product",
            "modifier": "regular",
            "address": "Минск ул.Дзержинского 134",
            "coordinate": {
              "id": 1,
              "lat": 53.90827480000001,
              "lng": 27.4697201
            }
          }
        ];
      }
    })
  });

  return { places: res.json() };
};

export default Share;
