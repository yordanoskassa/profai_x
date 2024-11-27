import React from 'react';
import "./Profile.css";

// ProfilePage component
const Profile = () => {
  // Example user data (this can be fetched from an API or passed as props)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software Developer passionate about building amazing web applications.',
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
};

export default Profile;