import React, { useState } from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Layout from "../components/Layout";
import ReturnToMainPageBtn from "../components/ReturnToMainPageBtn";
import PlaceKindSelector from "../components/PlaceKindSelector";
import CrowdLevelSlider from "../components/CrowdLevelSlider";
import { PLACE_KINDS } from "../constants/PLACE_KINDS";
import { withTranslation } from "../utils/i18n";

const Share = ({ t }) => {
  const [placeKind, setPlaceKind] = useState("mini");
  const [crowdLevel, setCrowdLevel] = useState(50);

  function handlePlaceKindChanged(kind) {
    setPlaceKind(kind);
  }

  function handleCrowdLevelChanged(level) {
    setCrowdLevel(level);
  }

  return (
    <Layout>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <ReturnToMainPageBtn />
        </Grid>
        <Grid item>
          <PlaceKindSelector
            kinds={PLACE_KINDS}
            selected={placeKind}
            onChange={handlePlaceKindChanged}
          />
        </Grid>
        <Grid item>
          <CrowdLevelSlider
            value={crowdLevel}
            onChange={handleCrowdLevelChanged}
          />
        </Grid>
        <Grid item>
          <Box justifyContent="center" display="flex">
            <Button size="large" variant="contained" color="primary">
              {t("btn-label-post")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

Share.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

Share.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(Share);
