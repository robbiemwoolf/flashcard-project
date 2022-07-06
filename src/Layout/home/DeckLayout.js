import React from "react";
import { Link } from "react-router-dom";

export default function DeckLayout({ name, description, id, cards, handleDeleteDeck }) {
  return (
    <div className='card my-1' key={id}>
      <div className='card-body'>
        <div className='deck-card-header row'>
          <div className='col'><h5 className='card-title '>{name}</h5></div>
          <div className='col text-right'><p className='card-subtitle'><small>{cards?.length} cards</small></p></div>
        </div>
        <p className='card-text'>{description}</p>
        <div className='deck-card-buttons'>
          <Link to={`/decks/${id}`} className='btn btn-secondary'>
            <i className='bi bi-eye-fill'></i> View
          </Link>
          <Link className='btn btn-primary mx-3' to={`/decks/${id}/study`}>
            <i className='bi bi-book'></i> Study
          </Link>
          <button
            className='btn btn-danger delete-deck ml-5'
            onClick={() => handleDeleteDeck(id)}
          >
            <i className='bi bi-trash'></i>
          </button>
        </div>
      </div>
    </div>
  );
}