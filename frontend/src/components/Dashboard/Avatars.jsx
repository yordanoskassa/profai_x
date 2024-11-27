import React, { useState, useEffect } from "react";
import AvatarList from "./AvatarList"; // Adjusted for one-level up directory
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"; // Import LoadingIndicator component
import "./Avatars.css"; // Import the CSS file for styling

const Avatars = () => {
  const [jsonData, setJsonData] = useState("");
  const [avatarNames, setAvatarNames] = useState([]); // State for avatar names
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

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
      <h1>Available Avatars</h1>

      {error && <div>Error: {error}</div>}

      {loading ? (
        <LoadingIndicator />
      ) : (
        <div>
          <AvatarList
            setJsonData={setJsonData}
            setError={setError}
            setLoading={setLoading}
            loading={loading}
          />
          {avatarNames.length > 0 ? (
            <ul>
              {avatarNames.map((name, index) => (
                <li key={index}>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div>No avatars available.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Avatars;