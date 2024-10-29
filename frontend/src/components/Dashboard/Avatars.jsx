// src/components/Avatars.jsx
import React, { useState, useEffect } from 'react';
import AvatarList from './Avatars_API';
import Avatar from './Avatars'; // Assuming Avatar is a separate component for individual avatar display

const Avatars = ({ token }) => {
  const [avatars, setAvatars] = useState([]);
  const [error, setError] = useState(null);

  // Log token for verification and fetch avatars only if token is available
  useEffect(() => {
    if (!token) {
      console.error("Token is undefined, cannot fetch avatars.");
      setError("Token is undefined, cannot fetch avatars.");
      return;
    }

    console.log("Fetching avatars with token:", token);

    // Call AvatarList or fetch function here if necessary
  }, [token]);

  // Prevent rendering if there's no token
  if (!token) {
    return <div>Loading... Please provide a valid token.</div>;
  }

  return (
    <div>
      <h2>Avatars</h2>
      {/* Pass token, setAvatars, and setError props to AvatarList */}
      <AvatarList setAvatars={setAvatars} setError={setError} token={token} />

      {error && <div>Error: {error}</div>}

      {avatars && avatars.length > 0 ? (
        avatars.map((avatar) => (
          <Avatar key={avatar.id} data={avatar} />
        ))
      ) : (
        <p>No avatars available.</p>
      )}
    </div>
  );
};

export default Avatars;
