// src/components/DashboardContent.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import AvatarList from './Avatars'; // Import your AvatarList component
import Projects from './Projects';     // You can create similar components for Projects, Templates, and Voices

const DashboardContent = ({ token }) => {
  return (
    <div className="dashboard-content">
      <Routes>
        <Route path="/dashboard/projects" element={<Projects />} />
        <Route path="/dashboard/avatars" element={<Avatars token={token} />} />
        <Route path="/dashboard/templates" element={<div>Your Templates will be listed here.</div>} />
        <Route path="/dashboard/voices" element={<div>Your Voices will be presented here.</div>} />
      </Routes>
    </div>
  );
};

export default DashboardContent;
