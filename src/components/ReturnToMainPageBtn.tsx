import React from "react";

import { Link } from 'react-router-dom';

import Fab from "@material-ui/core/Fab";
import ArrowBack from "@material-ui/icons/ArrowBack";

export const ReturnToMainPageBtn = () => (
  <Link to="/">
    <Fab color="primary" aria-label="add" size="large">
      <ArrowBack fontSize="large" />
    </Fab>
  </Link>
);

export default ReturnToMainPageBtn;
