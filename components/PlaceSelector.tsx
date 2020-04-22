import React, { ChangeEvent, useState } from 'react';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { IPlace } from '../interfaces/IPlace';

export interface IPlaceSelectorProps {
  onChange: (place: IPlace) => void;
  places: IPlace[];
  selected?: IPlace;
}

export const PlaceSelector = (props: IPlaceSelectorProps) => {
  const { onChange, places, selected: initialPlace } = props;
  const [ place, setPlace ] = useState(initialPlace || places[0]);

  function handleChange({ target }: ChangeEvent<{ value: number }>) {
    const selected = places.find(place => place.id === target.value);

    setPlace(selected);
    onChange(selected);
  }

  return <FormControl style={{ width: '100%' }}>
    <InputLabel id="place-label">The place</InputLabel>
    <Select labelId="place-label" onChange={handleChange} value={place.id}>
      { places.map(place => <MenuItem key={place.id} value={place.id}>{place.name} - {place.address}</MenuItem>) }
    </Select>
  </FormControl>
}

export default PlaceSelector;
