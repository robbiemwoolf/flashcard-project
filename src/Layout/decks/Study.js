import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardLayout from './CardLayout';
import { readDeck } from "../../utils/api/index";
import NotEnough from "./NotEnough";

export default function StudyDeck() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({ cards: [] });
    const [cardId, setCardId] = useState(0);

    //Set placeholder deck name before loading
    const name = deck.name ? deck.name : "Deck Name";

    useEffect(() => {
        const abortCon = new AbortController();

        async function loadDeck() {
            try {
                const deckInfo = await readDeck(deckId, abortCon.signal);
                setDeck(deckInfo);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.info("aborted");
                } else {
                    throw error;
                };
            };
        };

        loadDeck();

        return () => abortCon.abort();
    }, [deckId]);

    function handleNext() {
      if (cardId >= deck.cards.length - 1) {
        if (window.confirm("Restart cards?")) {
          setCardId(0);
        } else {
          history.push("/");
        }
      } else {
        setCardId(cardId + 1);
      };
    };

    const content = deck?.cards?.length > 2 ? (
      <CardLayout handleNext={handleNext} deck={deck} cardId={cardId} />
    ) : (
      <NotEnough deck={deck} />
    );

    return (
      <div>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/'>
                <i className='bi bi-house-door-fill'></i> Home
              </Link>
            </li>
            <li className='breadcrumb-item'>
              <Link to={`/decks/${deckId}`}>{name}</Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Study
            </li>
          </ol>
        </nav>
        <h1>{name}: Study</h1>
        {content}
      </div>
    );
};