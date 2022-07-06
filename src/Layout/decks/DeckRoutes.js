
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFound from "../NotFound";
import Study from "./Study";
import ViewDeck from "./ViewDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";

export default function DeckRoutes() {
    const { url } = useRouteMatch();

    return (
        <Switch>
            <Route path={"/decks/:deckId"} exact={true}>
                <ViewDeck />
            </Route>
            <Route path={"/decks/:deckId/study"} exact={true}>
                <Study />
            </Route>
            <Route path={"/decks/:deckId/edit"} exact={true}>
                <EditDeck />
            </Route>
            <Route path={"/decks/:deckId/cards/new"} exact={true}>
                <AddCard />
            </Route>
            <Route path={"/decks/:deckId/cards/:cardId/edit"}>
                <EditCard />
            </Route>
            <Route path={url}>
                <NotFound />
            </Route>
        </Switch>
    );
};