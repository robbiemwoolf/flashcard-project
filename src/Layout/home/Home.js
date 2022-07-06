
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
import DeckLayout from "./DeckLayout";

export default function Home() {
    const [decks, setDecks] = useState([]);
    const [loaded, setLoaded] = useState(false);
    console.log(loaded);

    useEffect(() => {
        setDecks([]);
        const abortCon = new AbortController();

        async function loadDecks() {
            try {
                let _decks = await listDecks(abortCon.signal);
                setDecks(_decks);
                setLoaded(true);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.info("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadDecks();
        return () => {
            console.info("aborting");
            abortCon.abort();
        }
    }, []);

    console.log(decks);

    //Deletes a deck and triggers a re-render with the deck removed
    async function handleDeleteDeck(id) {
        if (
            window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
        ) {
            await deleteDeck(id);
            setDecks(() => decks.filter((deck) => deck.id !== id));
        };
    };

    //Maps decks to JSX elements
    const rows = decks.map((deck) => DeckLayout({ ...deck, handleDeleteDeck }));

    
    

    return (
        <>
        <div className='row'>
            <Link to='/decks/new' className='btn btn-secondary'>
                <i className='bi bi-plus-lg'></i> Create Deck
            </Link>
        </div>
        <div className='row my-4'>{rows}</div>
        </>
    );
};