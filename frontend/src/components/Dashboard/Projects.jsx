import React, { useState } from "react";
import axios from "axios";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import "./Projects.css";
import { ACCESS_TOKEN } from "../../constants";
import { isTokenExpired, refreshToken } from "../../util/auth";
import setAuthToken from "../../util/setAuthToken";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [contentPrompt, setContentPrompt] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [generatedScript, setGeneratedScript] = useState("");
  const [isNewProjectVisible, setIsNewProjectVisible] = useState(false);
  const navigate = useNavigate();

  const fetchCSRFToken = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/get_csrf_token/', {
        withCredentials: true,
      });
      return response.data.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      throw new Error('Failed to fetch CSRF token');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contentPrompt) {
      setError("Please enter a content prompt.");
      return;
    }
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const csrfToken = await fetchCSRFToken();
      let accessToken = localStorage.getItem(ACCESS_TOKEN);

      if (!accessToken || isTokenExpired(accessToken)) {
        accessToken = await refreshToken();
      }

      if (!accessToken) {
        setError("User not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      setAuthToken(`Bearer ${accessToken}`);

      const response = await fetch("http://localhost:8000/api/generate_script/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': csrfToken,
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
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
    setContentPrompt("");
    setResponseMessage(null);
    setGeneratedScript("");
    setError(null);
    setIsNewProjectVisible(false);
  };

  const handleApprove = () => {
    navigate('/dashboard/project-submission', { state: { script: generatedScript } });
  };

  return (
    <div className="projects-container">
      <h1>{isNewProjectVisible ? "Step 1: Creating A Script" : "Projects"}</h1>

      {error && <div className="error-message">{error}</div>}
      {responseMessage && <div className="response-message">{responseMessage}</div>}

      {!isNewProjectVisible && (
        <button onClick={() => setIsNewProjectVisible(true)} className="new-project-button">
          New Project
        </button>
      )}

      {isNewProjectVisible && (
        <div>
          {loading && <LoadingIndicator />}

          {!loading && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Content Prompt:</label>
                <textarea
                  value={contentPrompt}
                  onChange={(e) => setContentPrompt(e.target.value)}
                  placeholder="Enter your content prompt here"
                  className="form-control"
                  rows="5"
                  required
                />
              </div>

              <button type="submit" className="submit-button">Submit</button>
            </form>
          )}

          {generatedScript && (
            <div>
              <h2>Generated Script</h2>
              <h4>Please adjust the script as needed for your avatar video. Slides will be generated based off of your script.</h4>
              <textarea
                value={generatedScript}
                onChange={(e) => setGeneratedScript(e.target.value)}
                className="form-control"
                rows="10"
              />
            </div>
          )}

          <button onClick={handleBack} className="back-button">Back</button>
          {generatedScript && (
            <button onClick={handleApprove} className="approve-button">Approve</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;