import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import CrowdChart from "../components/CrowdChart";
import ShareCrowdLevelBtn from "../components/ShareCrowdLevelBtn";
import CurrentStatusMsg from "../components/CurrentStatusMsg";
import Layout from "../components/Layout";
import { withTranslation } from "../i18n";

export const Home = ({ t }) => (
  <Layout>
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <CurrentStatusMsg text={t("status-perfect")} />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" spacing={5}>
          <Grid item style={{ width: "100%" }}>
            <CrowdChart />
          </Grid>
          <Grid item>
            <Link href="/statistic">
              <Button variant="contained" color="inherit">
                {t("btn-label-discover")}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <ShareCrowdLevelBtn text={t("msg-do-share")} />
      </Grid>
    </Grid>
  </Layout>
);

Home.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

Home.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(Home);
