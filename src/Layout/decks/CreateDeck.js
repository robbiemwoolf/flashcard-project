import React from "react";
import { Link, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { createDeck } from "../../utils/api/index";

export default function CreateDeck() {
  const history = useHistory();

  function handleSubmit(deck) {
    const abortCon = new AbortController();

    async function callCreateDeck() {
      try {
        const deckInfo = await createDeck(deck, abortCon.signal);
        history.push(`/decks/${deckInfo.id}`);
      } catch (err) {
        if (err.name === "AbortError") {
          console.info("aborted");
        } else {
          throw err;
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
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='bi bi-house-door-fill'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <DeckForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </div>
  );
};