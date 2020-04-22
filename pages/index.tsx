import React from "react";

import { NextPage } from "next";
import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import CrowdChart from "../components/CrowdChart";
import ShareCrowdLevelBtn from "../components/ShareCrowdLevelBtn";
import CurrentStatusMsg from "../components/CurrentStatusMsg";
import Layout from "../components/Layout";

export const Home: NextPage = () => (
  <Layout>
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <CurrentStatusMsg />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" spacing={5}>
          <Grid item style={{ width: "100%" }}>
            <CrowdChart />
          </Grid>
          <Grid item>
            <Link href="/statistic">
              <Button variant="contained" color="inherit">
                Discover statistic
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <ShareCrowdLevelBtn />
      </Grid>
    </Grid>
  </Layout>
);

export default Home;
