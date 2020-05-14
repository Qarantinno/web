import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider } from '@material-ui/core/styles';

import 'normalize.css';
import './i18n';

import * as serviceWorker from './serviceWorker';
import { theme } from './utils/theme';

const Home = lazy(() => import('./pages/home/HomePage'));
const Share = lazy(() => import('./pages/share/SharePage'));
const Statistic = lazy(() => import('./pages/statistic/StatisticPage'));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <Suspense fallback={
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      }>
        <Route exact path="/" component={Home} />
        <Route path="/share" component={Share} />
        <Route path="/statistic" component={Statistic} />
      </Suspense>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
