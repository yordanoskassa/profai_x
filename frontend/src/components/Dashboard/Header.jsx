// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('Profile'); // Ensure this matches the defined route
  };

  return (
    <header>
      <nav>
        <button onClick={() => navigate('/')}>
          ProfAI
        </button>
        <button onClick={handleProfileClick}>
          Account
        </button>
      </nav>
    </header>
  );
};

export default Header;