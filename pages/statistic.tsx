import React, { ChangeEvent, useState } from 'react';

import { NextPage } from 'next';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PlaceSelector from '../components/PlaceSelector';
import Layout from '../components/Layout';
import BackBtn from '../components/BackBtn';
import PlaceKindSelector from '../components/PlaceKindSelector';
import CrowdLevelSlider from '../components/CrowdLevelSlider';
import { IPlace } from '../interfaces/IPlace';
import { IPlaceKind } from '../interfaces/IPlaceKind';
import { placeKinds } from '../constants/place-kinds';

export interface IStatisticProps {
  places: IPlace[]
}

export const Statistic: NextPage<IStatisticProps> = ({ places }) => {
  const [ place, setPlace ] = useState(places[0]);
  const [ placeKind, setPlaceKind ] = useState(undefined);
  const [ comment, setComment ] = useState('');

  function handlePlaceChanged(selected: IPlace) {
    setPlace(selected);
  }

  function handlePlaceKindChanged(kind: IPlaceKind) {
    setPlaceKind(kind)
  }

  function handleCommentChanged({ target }: ChangeEvent<{ value: string }>) {
    setComment(target.value);
  }

  return (
    <Layout>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <BackBtn />
        </Grid>
        <Grid item>
          <PlaceSelector onChange={handlePlaceChanged} selected={place} places={places}/>
        </Grid>
        <Grid item>
          <PlaceSelector onChange={handlePlaceChanged} selected={place} places={places}/>
        </Grid>
        <Grid item>
          <PlaceSelector onChange={handlePlaceChanged} selected={place} places={places}/>
        </Grid>
      </Grid>
    </Layout>
  );
}

Statistic.getInitialProps = async () => {
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

export default Statistic;
