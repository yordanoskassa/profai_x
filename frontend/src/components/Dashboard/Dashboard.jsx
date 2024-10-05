import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import DashboardContent from '../DashboardContent';
import Header from '../Header';



function Dashboard() {
  const [activeTab, setActiveTab] = useState('defaultTab');

  return (
    <div className="dashboard-layout">
      <Header />
      <Sidebar setActiveTab={setActiveTab} />
      <DashboardContent activeTab={activeTab} />
    </div>
  );
}

export default Dashboard;
