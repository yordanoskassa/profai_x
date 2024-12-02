// Dashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Projects from './Projects';
import Avatars from './Avatars';
import Templates from './Templates';
import Voices from './Voices';
import Header from './Header';
import GetStarted from './GetStarted';
import Profile from './Profile';
import './Dashboard_styles.css';
import ProjectSubmission from './ProjectSubmission';
import VideoSlides from './VideoSlides';

const Dashboard = () => {
  const token = localStorage.getItem("authToken");

  return (
    <div className="dashboard-container">
      <Header />
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="projects" element={<Projects />} />
          <Route path="avatars" element={<Avatars />} />
          <Route path="templates" element={<Templates />} />
          <Route path="voices" element={<Voices />} />
          <Route path="project-submission" element={<ProjectSubmission />} />
          <Route path="project-submission/video-slides" element={<VideoSlides />} />
          <Route path="profile" element={<Profile />} /> {/* Corrected element prop */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
