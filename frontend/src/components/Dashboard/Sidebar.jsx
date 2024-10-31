// Code structure and contents provided by OpenAI:
// https://chatgpt.com/share/6722cfdd-2810-8000-9f5c-21c2a0b625e7
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
