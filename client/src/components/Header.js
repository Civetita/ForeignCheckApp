import React from 'react';
import './Header.css';

function Header({ setView, setRole, role }) {
  const switchRole = () => {
    if (role === 'admin') {
      setRole('HR');
    } else if (role === 'HR') {
      setRole('user');
    } else {
      setRole('admin');
    }
  };

  return (
    <header>
      <div className="role-switch">
        <button onClick={switchRole}>
          Switch Role ({role})
        </button>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="actions">
        <button onClick={() => setView('requestA1')}>Žádost o A1</button>
        <button onClick={() => setView('invitationRequest')}>Žádost o zvací/vysílací dopis</button>
        <button onClick={() => setView('documentControl')}>Kontrola Dokumentů</button>
      </div>
    </header>
  );
}

export default Header;
