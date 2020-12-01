import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import MoviePage from './views/MoviePage'
import GlobalProvider from './api/GlobalProvider'
import MovieDetails from './components/MovieDetails'
import createHistory from './api/history'
import NavBar from "./components/navBar";
import TrailerPlayer from './components/TrailerPlayer'
import SearchComponent from './components/SearchComponent';



ReactDOM.render(
  <GlobalProvider>
  <Router  history={createHistory }>
  <NavBar/>
  <Switch>
  <Route  path="/"  exact component={MoviePage} />
  <Route path="/MovieDetails/:id" component={MovieDetails}/>
  <Route path="/TrailerPlayer/:id" component={TrailerPlayer}/>
  <Route path="/SearchMovies" component = {SearchComponent}/>
  </Switch>
  </Router>
  </GlobalProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
