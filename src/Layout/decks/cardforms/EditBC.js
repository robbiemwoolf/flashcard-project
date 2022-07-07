import { Link } from "react-router-dom";

export default function Breadcrumb({ deckId, name, cardId }) {
    return (
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
                    Edit Card {cardId}
                </li>
            </ol>
        </nav>
    );
};