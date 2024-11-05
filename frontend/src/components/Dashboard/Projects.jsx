import React, { useState, useEffect } from 'react';
import AvatarList from './AvatarList'; // Adjusted for one-level up directory
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'; // Import LoadingIndicator component

const Projects = () => {
  const [jsonData, setJsonData] = useState("");
  const [avatarNames, setAvatarNames] = useState([]); // State for avatar names
  const [selectedAvatar, setSelectedAvatar] = useState(""); // State for selected avatar
  const [contentPrompt, setContentPrompt] = useState(""); // State for content prompt
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

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
      <h2>Please use the options below to select an avatar, and enter a content prompt!</h2>

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

      {/* Dropdown for Avatar Selection */}
      <div>
        <label htmlFor="avatarNames">Select Avatar:</label>
        <select
          id="avatarNames"
          value={selectedAvatar}
          onChange={(e) => setSelectedAvatar(e.target.value)}
          required
        >
          <option value="">Select an avatar</option>
          {avatarNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Content Prompt Text Field */}
      <div style={{ marginTop: '1em' }}>
        <label htmlFor="contentPrompt">Content Prompt:</label>
        <input
          type="text"
          id="contentPrompt"
          value={contentPrompt}
          onChange={(e) => setContentPrompt(e.target.value)}
          style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}
          placeholder="Enter your content prompt here"
        />
      </div>
    </div>
  );
};

export default Projects;
