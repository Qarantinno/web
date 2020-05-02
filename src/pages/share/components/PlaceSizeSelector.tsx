import React, { ChangeEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';

import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { theme } from "../../../utils/theme";
import { PlaceSizes } from '../../../enums/PlaceSizes';

const useClasses = makeStyles({
  paper: {
    minHeight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {
      cursor: "pointer",
      opacity: 0.5,
    },
  },
});

export interface IPlaceKindSelectorProps {
  sizes: PlaceSizes[];
  selected: any;
  onChange: any;
}

export const PlaceSizeSelector = ({ sizes, selected, onChange }: IPlaceKindSelectorProps) => {
  const [selectedKind, setSelectedKind] = useState(selected);
  const classes = useClasses();
  const { t } = useTranslation();

  function handleKindChanged({ target }: ChangeEvent<HTMLInputElement>) {
    const changed = sizes.find((size) => size === target.value);

    if (changed) {
      onChange(changed);
      setSelectedKind(changed);
    }
  }

  return (
    <Grid container direction="row" spacing={5}>
      {sizes.map((size) => (
        <Grid item xs={4} key={size}>
          <label>
            <input
              type="radio"
              checked={selectedKind === size}
              onChange={handleKindChanged}
              value={size}
              hidden
            />
            <Paper
              variant={size === selectedKind ? "outlined" : "elevation"}
              className={classes.paper}
              style={{
                backgroundColor:
                  size === selectedKind
                    ? theme.palette.background.default
                    : theme.palette.background.paper,
              }}
            >
              <Typography variant="overline">
                {t(`option-modifier-${size}`)}
              </Typography>
            </Paper>
          </label>
        </Grid>
      ))}
    </Grid>
  );
};


export default PlaceSizeSelector;
