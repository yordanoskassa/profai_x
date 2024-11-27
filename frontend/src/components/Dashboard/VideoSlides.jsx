import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN } from "../../constants";
import { isTokenExpired, refreshToken } from "../../util/auth";
import setAuthToken from "../../util/setAuthToken";

const VideoSlides = () => {
  const location = useLocation();
  const { videoId } = location.state || {};
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchVideoLink = async () => {
    setLoading(true);
    try {
      const csrfToken = await fetchCSRFToken();
      let accessToken = localStorage.getItem(ACCESS_TOKEN);

      if (!accessToken || isTokenExpired(accessToken)) {
        accessToken = await refreshToken();
      }

      if (!accessToken) {
        setError("User not authenticated. Please log in.");
        return;
      }

      setAuthToken(`Bearer ${accessToken}`);

      const response = await axios.post("http://127.0.0.1:8000/api/get_video_link/", {
        video_id: videoId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
          'Authorization': `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setVideoUrl(response.data.video_url);
        setError(null);
      } else if (response.status === 202) {
        setError('Video is not ready yet. Please try again later.');
      } else {
        throw new Error('Failed to fetch video link');
      }
    } catch (err) {
      setError('Failed to fetch video link');
    } finally {
      setLoading(false);
    }
  };

  console.log("videoUrl:", videoUrl); // Log videoUrl to check its value

  return (
    <div className="video-slides-container">
      <h2>Video Slides</h2>
      {videoUrl ? (
        <video src={videoUrl} controls />
      ) : (
        <div>
          <button onClick={fetchVideoLink} disabled={loading} style={{ display: 'block', margin: '20px 0' }}>
            {loading ? 'Fetching Video Link...' : 'Get Video Link'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default VideoSlides;