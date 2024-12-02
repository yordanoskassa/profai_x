// Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Navigate to the profile page
    navigate('/dashboard/profile');  // Full path to ensure correct routing
  };

  return (
    <header>
      <nav>
        <button onClick={() => navigate('/')}>
          ProfAI
        </button>
        <button onClick={handleProfileClick}>Account</button>
      </nav>
    </header>
  );
};

export default Header;
