import React, { useState, useEffect } from 'react';
import AvatarList from './AvatarList'; // Adjusted for one-level up directory
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'; // Import LoadingIndicator component

const Avatars = () => {
  const [jsonData, setJsonData] = useState("");
  const [avatarNames, setAvatarNames] = useState([]); // State for avatar names
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [apiToken, setApiToken] = useState(""); // State for optional API token input

  // Extract avatar names when jsonData updates
  useEffect(() => {
    try {
      if (jsonData) {
        const parsed = JSON.parse(jsonData);
        console.log("Parsed JSON:", parsed); // Log the parsed JSON for debugging
        
        // Access the 'avatars' array within the 'data' object
        const names = parsed.data && parsed.data.avatars ? parsed.data.avatars.map(avatar => avatar.avatar_name) : [];
        
        console.log("Extracted Names:", names); // Log the extracted names for debugging
        setAvatarNames(names);
        setError(null);
      }
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      setError("Failed to parse JSON data");
      setAvatarNames([]);
    }
  }, [jsonData]);

  return (
    <div>
      <h2>Available Avatars</h2>

      {/* Optional Token Input */}
      <div className="input-container">
        <label>API Token:</label>
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
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div>
          {avatarNames.length > 0 ? (
            <ul style={{ maxHeight: "400px", overflow: "auto" }}>
              {avatarNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          ) : (
            <textarea
              value={avatarNames.join(", ")} // Display only avatar names as a comma-separated list
              readOnly
              rows="20"
              cols="80"
              style={{ width: "100%", height: "400px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Avatars;
