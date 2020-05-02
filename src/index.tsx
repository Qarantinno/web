import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './i18n';
import * as serviceWorker from './serviceWorker';

const Home = lazy(() => import('./pages/home'));
const Share = lazy(() => import('./pages/share'));
const Statistic = lazy(() => import('./pages/statistic'));

ReactDOM.render(
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Route exact path="/" component={Home} />
      <Route path="/share" component={Share} />
      <Route path="/statistic" component={Statistic} />
    </Suspense>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
