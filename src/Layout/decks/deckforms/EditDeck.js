import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck, updateDeck } from "../../../utils/api/index";
import Breadcrumb from "./EditBC";

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
        };

        loadDeck();

        return () => abortCon.abort();
    }, [deckId]);

    function handleSubmit(deck) {
        const abortCon = new AbortController();

        async function editDeck() {
            try {
                const deckInfo = await updateDeck(deck, abortCon.signal);
                history.push(`/decks/${deckInfo.id}`);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.info("aborted");
                } else {
                    throw error;
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
            <Breadcrumb deckId={deckId} name={name} />
            <h1>Edit Deck</h1>
            <DeckForm
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                deck={deck}
            />
        </div>
    );
};