// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('My Projects');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('loggedIn');
    setIsLoggedIn(userLoggedIn === 'true');
  }, []);

  if (!isLoggedIn) {
    return <div>Please log in to access your Dashboard.</div>;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <DashboardContent activeTab={activeTab} />
    </div>
  );
};

export default Dashboard;
