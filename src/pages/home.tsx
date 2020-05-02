import React from "react";

import { useTranslation } from 'react-i18next';

import Grid from "@material-ui/core/Grid";

import CrowdChart from "../components/CrowdChart";
import ShareCrowdLevelBtn from "../components/ShareCrowdLevelBtn";
import CurrentStatusMsg from "../components/CurrentStatusMsg";
import Layout from "../components/Layout";
import LinkButton from '../components/LinkButton';

export const Home = () => {
  const { t } = useTranslation();
  
  return (
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
              <LinkButton to="/statistic">
                {t("btn-label-discover")}
              </LinkButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ShareCrowdLevelBtn text={t("msg-do-share")} />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Home;
