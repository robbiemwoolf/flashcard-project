import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck, updateDeck } from "../../utils/api/index";

export default function EditDeck() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

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
        }

        loadDeck();

        return () => abortCon.abort();
    }, [deckId]);

    function handleSubmit(deck) {
        const abortCon = new AbortController();

        async function editDeck() {
            try {
                const deckInfo = await updateDeck(deck, abortCon.signal);
                history.push(`/decks/${deckInfo.id}`);
            } catch (err) {
                if (err.name === "AbortError") {
                    console.info("aborted");
                } else {
                    throw err;
                };
            };
        };

        editDeck();

        return () => {
            abortCon.abort();
        };
    };

    function handleCancel() {
        history.push(`/decks/${deckId}`);
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
                    <li className='breadcrumb-item'>
                        <Link to={`/decks/${deckId}`}>{name}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <DeckForm
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                deck={deck}
            />
        </div>
    );
};