import React from "react";
import CardDetails from "./CardDetails";

export default function CardList({ deck, deleteHandler }) {
  let rows = deck.cards?.map((card) =>
    CardDetails({ ...card, deckId: deck.id, deleteHandler })
  );

  return (
    <>
      <h2 className='mt-4'>Cards</h2>
      {rows}
    </>
  );
};