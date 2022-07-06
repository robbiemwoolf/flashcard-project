import React, { useEffect, useState } from "react";

export default function DeckForm({ handleSubmit, handleCancel, deck }) {
  const [deckInfo, setDeckInfo] = useState(deck);
  useEffect(() => {
    setDeckInfo(deck);
  }, [deck]);
  const updateForm = (event) => {
    const { name, value } = event.target;
    setDeckInfo({ ...deckInfo, [name]: value });
  };
  const submit = (event) => {
    event.preventDefault();
    handleSubmit(deckInfo);
  };
  return (
    <form onSubmit={submit}>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          className='form-control'
          type='text'
          id='name'
          name='name'
          placeholder='Deck Name'
          value={deckInfo?.name || ""}
          onChange={updateForm}
          required
        ></input>
      </div>
      <div className='form-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          className='form-control'
          name='description'
          id='description'
          placeholder='Brief description of the deck'
          value={deckInfo?.description || ""}
          onChange={updateForm}
          required
        ></textarea>
        <button className='btn btn-secondary my-2' onClick={handleCancel}>
          Cancel
        </button>
        <button type='submit' className='btn btn-primary my-2'>
          Submit
        </button>
      </div>
    </form>
  );
}