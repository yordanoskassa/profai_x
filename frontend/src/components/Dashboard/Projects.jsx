import React, { useState, useEffect } from "react";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"; // Import LoadingIndicator component
import "./Projects.css"; // Import the CSS file for styling

const Projects = () => {
  const [avatarNames, setAvatarNames] = useState([]); // State for avatar names
  const [selectedAvatar, setSelectedAvatar] = useState(""); // State for selected avatar
  const [contentPrompt, setContentPrompt] = useState(""); // State for content prompt
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [responseMessage, setResponseMessage] = useState(null); // For backend response
  const [generatedScript, setGeneratedScript] = useState(null); // State for the generated script
  const [isNewProjectVisible, setIsNewProjectVisible] = useState(false); // Toggle for form visibility

  useEffect(() => {
    const fetchAvatars = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/get_avatars/");
        if (!response.ok) {
          throw new Error("Failed to fetch avatars");
        }
        const data = await response.json();
        const names =
          data.data?.avatars?.map((avatar) => avatar.avatar_name) || [];
        setAvatarNames(names);
        setError(null);
      } catch (err) {
        setError("Failed to load avatars");
      } finally {
        setLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAvatar || !contentPrompt) {
      setError("Please select an avatar and enter a content prompt.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/generate_script/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedAvatar,
          contentPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate script");
      }

      const data = await response.json();
      setResponseMessage(data.message || "Script generated successfully!");
      setGeneratedScript(data.generated_script);
    } catch (err) {
      setError("Failed to generate script");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedAvatar("");
    setContentPrompt("");
    setResponseMessage(null);
    setGeneratedScript(null);
    setError(null);
    setIsNewProjectVisible(false);
  };

  return (
    <div className="projects-container">
      <h2 className="heading">Projects</h2>

      {error && <p className="error-message">{error}</p>}
      {responseMessage && <p className="success-message">{responseMessage}</p>}

      <div className="video-container">
        {!isNewProjectVisible && (
          <>
            <video width="300" controls className="video-player">
              <source
                src="https://files2.heygen.ai/aws_pacific/avatar_tmp/1033b8a8ca6b4afbbab64fe388e0730f/63c8a5090b81476ebabd6fd4bff0c7c5.mp4?Expires=1732379399&Signature=lSxHg6EO8jLluPa5wTlxiLA7XEnFOfmbQ0bVuMfM~F18Vk7-x87rnxB5pxQv5mY1qEp2-TrEWkT3cciR8N1P-WnCmYdhOmY5AmmP-agwXQ~ksLIF3qRgnKGE4AMBkbCT6GGonCzekNBZ1dZS6D584i3UCtC-2rh5sDltD75erBZtorz3d77-VEDM1wFgGSkKdmKToqLWxyncixX4IC3YHKsTObU3VsKBn5z58YQcuDQIz0Ghln-Ofb7nIlKBupvu4Tcv-y38NsXUKI~fJ-rT75bWSqsM-LQjCT2pJrP9-80g~Hy3YbIigHYC3xvs88jfXXqTxknzrcPy7vBmkyxo3g__&Key-Pair-Id=K38HBHX5LX3X2H"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => setIsNewProjectVisible(true)}
              className="new-project-button"
            >
              New Project
            </button>
          </>
        )}
      </div>

      {isNewProjectVisible && (
        <div className="form-container">
          {loading && <LoadingIndicator />}

          {!loading && (
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="avatarNames">Select Avatar:</label>
                <select
                  id="avatarNames"
                  value={selectedAvatar}
                  onChange={(e) => setSelectedAvatar(e.target.value)}
                  required
                  className="form-control"
                >
                  <option value="">Select an avatar</option>
                  {avatarNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contentPrompt">Content Prompt:</label>
                <input
                  type="text"
                  id="contentPrompt"
                  value={contentPrompt}
                  onChange={(e) => setContentPrompt(e.target.value)}
                  placeholder="Enter your content prompt here"
                  className="form-control"
                />
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          )}

          {generatedScript && (
            <div className="script-container">
              <h3>Generated Script:</h3>
              <p>{generatedScript}</p>
            </div>
          )}

          <button onClick={handleBack} className="back-button">
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
