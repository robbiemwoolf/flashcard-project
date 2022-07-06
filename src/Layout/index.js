import React from "react";
import { Switch, Route } from 'react-router-dom';
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./home/Home";
import CreateDeck from "./decks/CreateDeck";
import DeckRoutes from "./decks/DeckRoutes";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/decks/new'>
            <CreateDeck />
          </Route>
          <Route path='/decks/:deckId'>
            <DeckRoutes />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        
      </div>
    </>
  );
}

export default Layout;
