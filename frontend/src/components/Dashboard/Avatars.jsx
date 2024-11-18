import React, { useState, useEffect } from "react";
import AvatarList from "./AvatarList"; // Adjusted for one-level up directory
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"; // Import LoadingIndicator component
import "./Avatars.css"; // Import the CSS file for styling

const Avatars = () => {
  const [jsonData, setJsonData] = useState("");
  const [avatarNames, setAvatarNames] = useState([]); // State for avatar names
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [apiToken, setApiToken] = useState(""); // State for optional API token input

  useEffect(() => {
    try {
      if (jsonData) {
        const parsed = JSON.parse(jsonData);
        const names =
          parsed.data && parsed.data.avatars
            ? parsed.data.avatars.map((avatar) => avatar.avatar_name)
            : [];
        setAvatarNames(names);
        setError(null);
      }
    } catch (parseError) {
      setError("Failed to parse JSON data");
      setAvatarNames([]);
    }
  }, [jsonData]);

  return (
    <div className="avatars-container">
      <h2 className="white heading">Available Avatars</h2>

      {/* Optional Token Input */}
      <div className="input-container">
        <label className="input-label white">API Token:</label>
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

      {error && <p className="error-message">Error: {error}</p>}

      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="results-container">
          {avatarNames.length > 0 ? (
            <ul className="avatar-list">
              {avatarNames.map((name, index) => (
                <li key={index} className="avatar-item">
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <textarea
              value={avatarNames.join(", ")} // Display only avatar names as a comma-separated list
              readOnly
              className="results-textarea"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Avatars;
