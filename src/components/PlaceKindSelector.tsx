import React, { ChangeEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';

import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import theme from "../utils/theme";

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
  kinds: any[];
  selected: any;
  onChange: any;
}

export const PlaceKindSelector = ({ kinds, selected, onChange }: IPlaceKindSelectorProps) => {
  const [selectedKind, setSelectedKind] = useState(selected);
  const classes = useClasses();
  const { t } = useTranslation();

  function handleKindChanged({ target }: ChangeEvent<{ value: string }>) {
    const changed = kinds.find((kind) => kind === target.value);

    if (changed) {
      onChange(changed);
      setSelectedKind(changed);
    }
  }

  return (
    <Grid container direction="row" spacing={5}>
      {kinds.map((kind) => (
        <Grid item xs={4} key={kind}>
          <label>
            <input
              type="radio"
              checked={selectedKind === kind.id}
              onChange={handleKindChanged}
              value={kind.id}
              hidden
            />
            <Paper
              variant={kind === selectedKind ? "outlined" : "elevation"}
              className={classes.paper}
              style={{
                backgroundColor:
                  kind === selectedKind
                    ? theme.palette.background.default
                    : theme.palette.background.paper,
              }}
            >
              <Typography variant="overline">
                {t(`option-modifier-${kind}`)}
              </Typography>
            </Paper>
          </label>
        </Grid>
      ))}
    </Grid>
  );
};


export default PlaceKindSelector;
