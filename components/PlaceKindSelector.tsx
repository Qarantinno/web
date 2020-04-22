import React, { ChangeEvent, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import theme from '../utils/theme';
import { IPlaceKind } from '../interfaces/IPlaceKind';

const useClasses = makeStyles({
  paper: {
    minHeight: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&:hover': {
      cursor: 'pointer',
      opacity: 0.5,
    }
  }
});

export interface IPlaceKindSelectorProps {
  placeKinds: IPlaceKind[];
  defaultSelected?: IPlaceKind;
  onChange: (kind: IPlaceKind) => void;
}

export const PlaceKindSelector = ({placeKinds, defaultSelected, onChange}: IPlaceKindSelectorProps) => {
  const [selected, setSelected] = useState(defaultSelected);
  const classes = useClasses();

  function handlePlaceKindSelected({target}: ChangeEvent<{ value: string }>) {
    const selectedPlaceKindId = Number.parseInt(target.value);
    const selectedPlaceKind = placeKinds.find(placeKind => placeKind.id === selectedPlaceKindId);

    if (selectedPlaceKind) {
      onChange(selectedPlaceKind);
      setSelected(selectedPlaceKind)
    }
  }

  return (
    <Grid container direction="row" spacing={5}>
      {placeKinds.map(placeKind => (
        <Grid item xs={4} key={placeKind.id}>
          <label>
            <input type="radio" checked={selected?.id === placeKind.id} onChange={handlePlaceKindSelected}
                   value={placeKind.id} hidden/>
            <Paper
              variant={placeKind.id === selected?.id ? 'outlined' : 'elevation'}
              className={classes.paper} 
              style={{backgroundColor: placeKind.id === selected?.id 
                  ? theme.palette.background.default
                  : theme.palette.background.paper
              }}
            >
              <Typography variant='overline'>{placeKind.name}</Typography>
            </Paper>
          </label>
        </Grid>
      ))}
    </Grid>
  )
}

export default PlaceKindSelector;
