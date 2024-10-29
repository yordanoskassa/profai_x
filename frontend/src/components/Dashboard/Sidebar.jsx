// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">My Dashboard</h3>
      <ul className="sidebar-list">
        <li>
          <NavLink to="/dashboard/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
            My Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/avatars" className={({ isActive }) => (isActive ? 'active' : '')}>
            My Avatars
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/templates" className={({ isActive }) => (isActive ? 'active' : '')}>
            My Templates
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/voices" className={({ isActive }) => (isActive ? 'active' : '')}>
            My Voices
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
