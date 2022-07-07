import { Link } from "react-router-dom";

export default function Breadcrumb({ name, deckId }) {
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
                    Study
                </li>
            </ol>
        </nav>
    );
};