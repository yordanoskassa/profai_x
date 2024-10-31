import React, { useState } from 'react';
import AvatarList from './AvatarList';

const Avatars = () => {
  const [jsonData, setJsonData] = useState("");
  const [error, setError] = useState(null);

  return (
    <div>
      <h2>Available Avatars</h2>
      <AvatarList setJsonData={setJsonData} setError={setError} />
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <h3>JSON Response</h3>
      <textarea
        value={jsonData}
        readOnly
        rows="20"
        cols="80"
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
};

export default Avatars;
