import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import Header from '../elements/Header';
import Movie from '../Movie';
import ErrorPage from '../elements/ErrorPage';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:movieId' component={Movie} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
};

export default App;
