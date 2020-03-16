import React from "react";
import "./styles.css";
import Navigation from "./components/Navigation";

import { Switch, Route } from "react-router";
import FilmList from "./scenes/FilmList";
import { Home } from "./scenes/Home";
import SingleFilm from "./scenes/SingleFilm";
import { Provider, rootStore } from "./models/Root";

export default function App() {
  return (
    <Provider value={rootStore}>
      <div className="App">
        <div className="header">
          <Navigation />
          <Switch>
            <Route exact path="/" render={() => <Home />} />

            <Route path="/movies/:id" render={() => <SingleFilm />} />
            <Route path="/movies" render={() => <FilmList />} />
          </Switch>
        </div>
      </div>
    </Provider>
  );
}
