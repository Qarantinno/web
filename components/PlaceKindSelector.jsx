import React, { useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import theme from "../utils/theme";
import { withTranslation } from "../i18n";
import PropTypes from "prop-types";

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

const PlaceKindSelector = ({ t, kinds, selected, onChange }) => {
  const [selectedKind, setSelectedKind] = useState(selected);
  const classes = useClasses();

  function handleKindChanged({ target }) {
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

PlaceKindSelector.propTypes = {
  selected: PropTypes.string.isRequired,
  kinds: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(PlaceKindSelector);
