import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const history = useHistory();

  return (
    <div className="container navbar">
      <Link to="/">Home</Link>
      <button
        className="btn-main"
        style={{
          fontSize: '15px',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
        onClick={() => history.goBack()}
      >
        Go Back
      </button>
      <nav className="nav-links">
        <Link to="/players">Players</Link>
        <Link to="/teams">Teams</Link>
      </nav>
    </div>
  );
}
