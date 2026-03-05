import React from 'react';
import { useApp } from '../context/AppContext';
import '../css/Navbar.css'; 

const Navbar = React.memo(function Navbar() {
  const { state, dispatch } = useApp();
  const { user, page } = state;

  return (
    <nav className="navbar">
      <div
        className="nav-brand"
        onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
      >
        ◆ <span className="nav-brand-gold">Grand</span>Luxe
      </div>

      <div className="nav-links">
        <button
          className={`nav-item ${page === 'dashboard' || page === 'room' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'dashboard' })}
        >
          Rooms
        </button>
        <button
          className={`nav-item ${page === 'bookings' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'bookings' })}
        >
          My Bookings
          {state.bookings.length > 0 && (
            <span className="nav-badge">{state.bookings.length}</span>
          )}
        </button>
      </div>

      <div className="nav-right">
        <span className="nav-user-name">{user?.name}</span>
        <div className="nav-avatar">{user?.name?.[0]}</div>
        <button
          className="btn btn-ghost"
          onClick={() => dispatch({ type: 'LOGOUT' })}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
});

export default Navbar;
