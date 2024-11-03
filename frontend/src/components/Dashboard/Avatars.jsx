import React, { useState } from 'react';
import AvatarList from './AvatarList'; // Adjusted for one-level up directory
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'; // Import LoadingIndicator component

const Avatars = () => {
  const [jsonData, setJsonData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [apiToken, setApiToken] = useState(""); // State for optional API token input

  return (
    <div>
      <h2>Available Avatars</h2>
      {/* Optional Token Input */}
          <div className="input-container">
      <label >API Token:</label>
      <input
        type="text"
        value={apiToken}
        onChange={(e) => setApiToken(e.target.value)}
        placeholder="Enter API Token"
        className="input-box"
      />
    </div>


      <AvatarList
        setJsonData={setJsonData}
        setError={setError}
        setLoading={setLoading} // Pass down setLoading
        loading={loading} // Pass down loading state
      />

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Show LoadingIndicator if loading is true */}
      {loading ? <LoadingIndicator /> : (
        <textarea
          value={jsonData}
          readOnly
          rows="20"
          cols="80"
          style={{ width: "100%", height: "400px" }}
        />
      )}
    </div>
  );
};

export default Avatars;
