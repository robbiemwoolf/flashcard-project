import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { createCard, readDeck } from "../../../utils/api/index";
import Breadcrumb from "./AddBC";

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
            <Breadcrumb deckId={deckId} deck={deck} />
            <h1>{deck.name}: Add Card</h1>
            <CardForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
    );
};