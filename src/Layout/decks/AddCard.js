import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { createCard, readDeck } from "../../utils/api/index";

export default function AddCard() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

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

    // Creates a new card
    async function handleSubmit(card) {
        try {
            await createCard(deckId, card);
        } catch (error) {
            throw error;
        };
    };

    //Returns to deck details screen
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
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
                Add Card
            </li>
            </ol>
        </nav>
        <h1>{deck.name}: Add Card</h1>
        <div className='card-toast alert alert-success d-none'>Card Added!</div>
        <CardForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
    );
};