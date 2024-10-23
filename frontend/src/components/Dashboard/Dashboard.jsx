// src/components/Dashboard.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import your Sidebar component
import Avatars from './Avatars'; // Import the Avatars component
import Projects from './Projects'; // Import Projects component (if you have one)
import Templates from './Templates'; // Import Templates component (if you have one)
import Voices from './Voices'; // Import Voices component (if you have one)

const Dashboard = ({ token }) => {
  return (
    <Router>
      <div className="dashboard">
        <Sidebar setActiveTab={(tab) => console.log(tab)} /> {/* You can handle active tabs here */}

        <div className="content">
          <Switch>
            <Route path="/dashboard/projects">
              <Projects token={token} /> {/* Render Projects component */}
            </Route>
            <Route path="/dashboard/avatars">
              <Avatars token={token} /> {/* Render Avatars component */}
            </Route>
            <Route path="/dashboard/templates">
              <Templates token={token} /> {/* Render Templates component */}
            </Route>
            <Route path="/dashboard/voices">
              <Voices token={token} /> {/* Render Voices component */}
            </Route>
            <Route path="/">
              <h2>Welcome to the Dashboard</h2> {/* Default route */}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
