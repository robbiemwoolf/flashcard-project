import { Link } from "react-router-dom";

export default function Breadcrumb() {
  return (
  <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          <Link to='/'>
            <i className='bi bi-house-door-fill'></i> Home
          </Link>
        </li>
        <li className='breadcrumb-item active' aria-current='page'>
          Create Deck
        </li>
      </ol>
    </nav>
  );
};