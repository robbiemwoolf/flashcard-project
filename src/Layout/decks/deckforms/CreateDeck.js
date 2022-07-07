import React from "react";
import { useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { createDeck } from "../../../utils/api/index";
import Breadcrumb from "./CreateBC";

export default function CreateDeck() {
  const history = useHistory();

  function handleSubmit(deck) {
    const abortCon = new AbortController();

    async function callCreateDeck() {
      try {
        const deckInfo = await createDeck(deck, abortCon.signal);
        history.push(`/decks/${deckInfo.id}`);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("aborted");
        } else {
          throw error;
        };
      };
    };

    callCreateDeck();

    return () => {
      abortCon.abort();
    };
  };

  function handleCancel() {
    history.push("/");
  };

  return (
    <div>
      <Breadcrumb />
      <h1>Create Deck</h1>
      <DeckForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </div>
  );
};