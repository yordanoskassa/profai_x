import React, { useState } from "react";
import axios from "axios";

const GetStarted = () => {
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state while submitting

    try {
      // Send the API key to the backend
      const response = await axios.post(
        "http://127.0.0.1:8000/api/save_api/",
        { key  : apiKey },
      );

      // Handle success
      setMessage("API Key submitted successfully!");
      setApiKey(""); // Clear the input field
    } catch (error) {
      // Handle errors
      console.error("Error submitting API key:", error);
      setMessage(
        error.response?.data?.detail || "Failed to submit API Key. Try again."
      );
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="get-started-container">
      <h2>Get Started</h2>
      <form onSubmit={handleSubmit} className="api-key-form">
        <div className="form-group">
          <label htmlFor="apiKey">Enter Your API Key:</label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API Key"
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && (
        <p
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default GetStarted;
