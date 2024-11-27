// src/components/Dashboard/GetStarted.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";
import { isTokenExpired, refreshToken } from "../../util/auth";
import setAuthToken from "../../util/setAuthToken";

const GetStarted = () => {
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const csrfToken = await fetchCSRFToken();
      let accessToken = localStorage.getItem(ACCESS_TOKEN);

      if (!accessToken || isTokenExpired(accessToken)) {
        accessToken = await refreshToken();
      }

      if (!accessToken) {
        setMessage("User not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      // Set the authorization token for all requests
      setAuthToken(`Bearer ${accessToken}`);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/save_api/',
        { key: apiKey },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );

      setMessage("API Key created successfully.");
      console.log('Success:', response.data);
    } catch (error) {
      setMessage(`Error: ${error.response?.data || error.message}`);
      console.error('Error submitting API Key:', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Get Started</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Your API Key:</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API Key"
            required
            className="input-field"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && (
        <div>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default GetStarted;