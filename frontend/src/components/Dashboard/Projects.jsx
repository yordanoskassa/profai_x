import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'; // Import LoadingIndicator component

const Projects = () => {
  const [avatarNames, setAvatarNames] = useState([]); // State for avatar names
  const [selectedAvatar, setSelectedAvatar] = useState(""); // State for selected avatar
  const [contentPrompt, setContentPrompt] = useState(""); // State for content prompt
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [responseMessage, setResponseMessage] = useState(null); // For backend response
  const [generatedScript, setGeneratedScript] = useState(null); // State for the generated script
  const [isNewProjectVisible, setIsNewProjectVisible] = useState(false); // Toggle for form visibility

  // Fetch avatars on page load
  useEffect(() => {
    const fetchAvatars = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/get_avatars/');
        if (!response.ok) {
          throw new Error('Failed to fetch avatars');
        }
        const data = await response.json();
        console.log('Avatar API Response:', data);

        // Parse avatar names
        const names = data.data?.avatars?.map((avatar) => avatar.avatar_name) || [];
        setAvatarNames(names);
        setError(null);
      } catch (err) {
        console.error('Error fetching avatars:', err);
        setError('Failed to load avatars');
      } finally {
        setLoading(false);
      }
    };

    fetchAvatars(); // Trigger the fetch
  }, []); // Empty dependency array ensures it only runs once on mount

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAvatar || !contentPrompt) {
      setError("Please select an avatar and enter a content prompt.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/generate_script/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedAvatar: selectedAvatar,
          contentPrompt: contentPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.json();
      console.log('Script API Response:', data);
      setResponseMessage(data.message || "Script generated successfully!");
      setGeneratedScript(data.generated_script);
    } catch (err) {
      console.error('Error generating script:', err);
      setError("Failed to generate script");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    // Reset state and go back to the initial view
    setSelectedAvatar("");
    setContentPrompt("");
    setResponseMessage(null);
    setGeneratedScript(null);
    setError(null);
    setIsNewProjectVisible(false);
  };

  return (
    <div>
      <h2>Projects</h2>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}

      {!isNewProjectVisible && (
        <button onClick={() => setIsNewProjectVisible(true)} style={{ margin: '1em' }}>
          New Project
        </button>
      )}

      {isNewProjectVisible && (
        <div>
          {loading && <LoadingIndicator />}

          {!loading && (
            <form onSubmit={handleSubmit}>
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

              <button type="submit" style={{ marginTop: '1em' }}>
                Submit
              </button>
            </form>
          )}

          {generatedScript && (
            <div style={{ marginTop: '2em', padding: '1em', border: '1px solid #ccc' }}>
              <h3>Generated Script:</h3>
              <p>{generatedScript}</p>
            </div>
          )}

          <button onClick={handleBack} style={{ marginTop: '2em', display: 'block' }}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
