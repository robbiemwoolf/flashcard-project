import React from "react";
import { Link } from "react-router-dom";

export default function DeckLayout({ name, description, id, cards, handleDeleteDeck }) {
  return (
    <div className='card my-1 w-100' key={id}>
      <div className='card-body'>
        <div className='row'>
          <div className='col'><h5 className='card-title '>{name}</h5></div>
          <div className='col text-right'><p className='card-subtitle'><small>{cards.length} cards</small></p></div>
        </div>
        <p className='card-text'>{description}</p>
        <div className='d-flex'>
          <Link to={`/decks/${id}`} className='btn btn-secondary mr-2 p-2'>
            <i className='bi bi-eye-fill'></i> View
          </Link>
          <Link className='btn btn-primary p-2' to={`/decks/${id}/study`}>
            <i className='bi bi-book'></i> Study
          </Link>
          <button
            className='btn btn-danger ml-auto p-2'
            onClick={() => handleDeleteDeck(id)}
          >
            <i className='bi bi-trash'></i>
          </button>
        </div>
      </div>
    </div>
  );
}