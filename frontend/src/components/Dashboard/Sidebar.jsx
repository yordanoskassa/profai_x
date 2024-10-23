// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for active tab tracking
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation(); // Get the current path to track the active tab

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">My Dashboard</h3>
      <ul className="sidebar-list">
        <li className={location.pathname === '/dashboard/projects' ? 'active' : ''}>
          <Link to="/dashboard/projects">My Projects</Link>
        </li>
        <li className={location.pathname === '/dashboard/avatars' ? 'active' : ''}>
          <Link to="/dashboard/avatars">My Avatars</Link>
        </li>
        <li className={location.pathname === '/dashboard/templates' ? 'active' : ''}>
          <Link to="/dashboard/templates">My Templates</Link>
        </li>
        <li className={location.pathname === '/dashboard/voices' ? 'active' : ''}>
          <Link to="/dashboard/voices">My Voices</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
