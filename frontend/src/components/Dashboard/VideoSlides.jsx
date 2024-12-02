import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN } from "../../constants";
import { isTokenExpired, refreshToken } from "../../util/auth";
import setAuthToken from "../../util/setAuthToken";

const VideoSlides = () => {
  console.log("Component VideoSlides is rendering");

  // Get the state passed from the navigate function
  const location = useLocation();
  const { videoId } = location.state || { videoId: null };
  const navigate = useNavigate();

  // State to store video URL or error message
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  // Log the videoId to confirm it's being received
  useEffect(() => {
    console.log("Video ID from location state:", videoId);
  }, [videoId]);

  // Function to fetch the CSRF token from the backend
  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/get_csrf_token/');
      setCsrfToken(response.data.csrfToken);
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
      setError("Failed to fetch CSRF token.");
    }
  };

  useEffect(() => {
    fetchCsrfToken(); // Fetch CSRF token when the component is mounted
  }, []);

  // Function to call the backend API
  const getVideoLink = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!csrfToken) {
        setError("CSRF token is missing.");
        return;
      }

      let accessToken = localStorage.getItem(ACCESS_TOKEN);

      // If no access token or it is expired, refresh the token
      if (!accessToken || isTokenExpired(accessToken)) {
        accessToken = await refreshToken();
      }

      // If there's still no access token, redirect the user to the login page
      if (!accessToken) {
        setError("User not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      // Set the Authorization header with the access token
      setAuthToken(`Bearer ${accessToken}`);

      try {
        // Send the POST request to get the video link, passing the videoId and headers
        const response = await axios.post(
          'http://localhost:8000/api/get_video_link/',
          { video_id: videoId },  // Pass the videoId in the request body
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken, // Include CSRF token
              'Authorization': `Bearer ${accessToken}`,  // Pass the access token in the header
            },
            withCredentials: true,  // Include credentials if needed for cross-origin requests
          }
        );

        // Check if the request was successful
        if (response.status === 200) {
          const { video_url } = response.data;
          setVideoUrl(video_url);
          console.log("Video URL received:", video_url);
        } else {
          setError('Video is not ready yet.');
          console.log("Video is not ready yet.");
        }
      } catch (err) {
        setError('Failed to fetch video link: ' + err.message);
        console.error('Error fetching video link:', err);
      }
    } catch (err) {
      setError('Error processing the request: ' + err.message);
      console.error('Error processing the request:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-slides-container">
      <h2>Video ID</h2>
      {/* Conditionally render the videoId if available */}
      {videoId ? (
        <p>Your Video ID is: {videoId}</p>
      ) : (
        <p>No video ID available.</p>
      )}

      {/* Button to call getVideoLink */}
      <button onClick={getVideoLink} disabled={loading}>
        {loading ? 'Loading...' : 'Get Video Link'}
      </button>

      {/* Display video URL or error */}
      {videoUrl ? (
        <div>
          <h3>Video is ready!</h3>
          {/* Embed the video in a <video> element */}
          <video width="600" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Video is not available yet. Please try again later.</p>
      )}
    </div>
  );
};

export default VideoSlides;
