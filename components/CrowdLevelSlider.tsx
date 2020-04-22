import React, { ChangeEvent, useState } from 'react';

import Slider from '@material-ui/core/Slider';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

const marks = [
  {
    value: 0,
    label: (
      <div>
        <div><EmojiPeopleIcon /></div>
      </div>
    ),
  },
  {
    value: 50,
    label: (
      <div style={{ display: 'flex', width: '50px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '30%' }}><EmojiPeopleIcon /></div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '30%' }}><EmojiPeopleIcon /></div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '30%' }}><EmojiPeopleIcon /></div>
      </div>
    ),
  },
  {
    value: 100,
    label: (
      <div style={{ display: 'flex', width: '50px', justifyContent: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '20%' }}><EmojiPeopleIcon /></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '20%' }}><EmojiPeopleIcon /></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '20%' }}><EmojiPeopleIcon /></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '20%' }}><EmojiPeopleIcon /></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '20%' }}><EmojiPeopleIcon /></div>
      </div>
    ),
  }
];

export interface ICrowdLevelSliderProps {
  defaultValue?: number;
  onChange: (level: number) => void;
}

export const CrowdLevelSlider = ({ onChange, defaultValue = 50 }: ICrowdLevelSliderProps) => {
  const [level, setLevel] = useState(defaultValue);
  
  function handleLevelChanged({ target }: ChangeEvent<{ value: number }>) {
    setLevel(target.value);
    onChange(target.value);
  }

  return (
    <div>
      <Slider
        defaultValue={level}
        value={level}
        step={10}
        marks={marks}
        onChange={handleLevelChanged}
      />
    </div>
  )
}

export default CrowdLevelSlider;
