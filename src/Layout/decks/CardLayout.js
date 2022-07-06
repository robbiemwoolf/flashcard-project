import React, { useState } from "react";

export default function CardLayout({ handleNext, deck = { cards: [] }, cardId = 0 }) {
    const { cards } = deck;
    const card = cards[cardId] || {};
    const [side, setSide] = useState(true);

    function flipCard() {
        setSide(!side);
    };

    const nextButton = !side ? (
        <button
            className='btn btn-primary btn-next'
            onClick={() => {
                setSide(true);
                handleNext();
            }}
        >
            Next
        </button>
    ) : ("");

    return (
        <div className='card my-1 front'>
            <div>
                <h5 className='card-title'>
                    Card {cardId + 1} of {cards.length}
                </h5>
                <p className='card-text'>{ side ? card.front : card.back }</p>
                <button className='btn btn-secondary' onClick={flipCard}>
                    Flip
                </button>
                {nextButton}
            </div>
        </div>
    );
};