// src/components/DashboardContent.jsx
import React from 'react';
import './DashboardContent.css';

const DashboardContent = ({ activeTab }) => {
  return (
    <div className="dashboard-content">
      {activeTab === 'My Projects' && <div>Your Projects will be shown here.</div>}
      {activeTab === 'My Avatars' && <div>Your Avatars will be displayed here.</div>}
      {activeTab === 'My Templates' && <div>Your Templates will be listed here.</div>}
      {activeTab === 'My Voices' && <div>Your Voices will be presented here.</div>}
    </div>
  );
};

export default DashboardContent;
