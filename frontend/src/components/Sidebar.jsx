// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">My Dashboard</h3>
      <ul className="sidebar-list">
        <li className={activeTab === 'My Projects' ? 'active' : ''} onClick={() => setActiveTab('My Projects')}>My Projects</li>
        <li className={activeTab === 'My Avatars' ? 'active' : ''} onClick={() => setActiveTab('My Avatars')}>My Avatars</li>
        <li className={activeTab === 'My Templates' ? 'active' : ''} onClick={() => setActiveTab('My Templates')}>My Templates</li>
        <li className={activeTab === 'My Voices' ? 'active' : ''} onClick={() => setActiveTab('My Voices')}>My Voices</li>
      </ul>
    </div>
  );
};

export default Sidebar;
