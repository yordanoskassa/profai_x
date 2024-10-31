// Code structure and contents provided by OpenAI:
// https://chatgpt.com/share/6722cfdd-2810-8000-9f5c-21c2a0b625e7
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Projects from './Projects';
import Avatars from './Avatars';
import Templates from './Templates';
import Voices from './Voices';
import './Dashboard_styles.css';

const Dashboard = () => {
  // Retrieve the token, here assumed to be from localStorage.
  const token = localStorage.getItem("authToken");

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="projects" element={<Projects />} />
          {/* Pass the token to Avatars component */}
          <Route path="avatars" element={<Avatars token={token} />} />
          <Route path="templates" element={<Templates />} />
          <Route path="voices" element={<Voices />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
