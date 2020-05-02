import React, { ChangeEvent, useState } from 'react';

import Slider from "@material-ui/core/Slider";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

const marks = [
  {
    value: 0,
    label: (
      <div>
        <div>
          <EmojiPeopleIcon />
        </div>
      </div>
    ),
  },
  {
    value: 50,
    label: (
      <div style={{ display: "flex", width: "50px", justifyContent: "center" }}>
        <div
          style={{ display: "flex", justifyContent: "center", width: "30%" }}
        >
          <EmojiPeopleIcon />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "30%" }}
        >
          <EmojiPeopleIcon />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "30%" }}
        >
          <EmojiPeopleIcon />
        </div>
      </div>
    ),
  },
  {
    value: 100,
    label: (
      <div style={{ display: "flex", width: "50px", justifyContent: "left" }}>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "20%" }}
        >
          <EmojiPeopleIcon />
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "20%" }}
        >
          <EmojiPeopleIcon />
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "20%" }}
        >
          <EmojiPeopleIcon />
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "20%" }}
        >
          <EmojiPeopleIcon />
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "20%" }}
        >
          <EmojiPeopleIcon />
        </div>
      </div>
    ),
  },
];

export interface ICrowdLevelSliderProps {
  onChange: (value: number) => void;
  value: number;
}
export const CrowdLevelSlider = ({ onChange, value = 50 }: ICrowdLevelSliderProps) => {
  const [level, setLevel] = useState<number>();

  function handleLevelChanged(_: ChangeEvent<{}>, value: number | number[]) {
    setLevel(value as number);
    onChange(value as number);
  }

  return (
    <Slider
      defaultValue={value}
      value={level}
      step={1}
      valueLabelDisplay="auto"
      marks={marks}
      onChange={handleLevelChanged}
    />
  );
};

export default CrowdLevelSlider;
