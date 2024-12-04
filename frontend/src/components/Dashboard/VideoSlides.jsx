import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN } from "../../constants";
import { isTokenExpired, refreshToken } from "../../util/auth";
import setAuthToken from "../../util/setAuthToken";

const VideoSlides = () => {
  const location = useLocation();
  const { videoId, script } = location.state || { videoId: null, script: '' };
  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [slideOutline, setSlideOutline] = useState(''); // Default to an empty string for slides

  useEffect(() => {
    console.log("Video ID from location state:", videoId);
  }, [videoId]);

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
    fetchCsrfToken();
  }, []);

  const getVideoLink = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!csrfToken) {
        setError("CSRF token is missing.");
        return;
      }

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

      try {
        const response = await axios.post(
          'http://localhost:8000/api/get_video_link/',
          { video_id: videoId },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

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

  const generateSlideOutline = async () => {
    setLoading(true);
    setError(null);
    setSlideOutline(''); // Reset previous slide outline

    try {
      if (!csrfToken) {
        setError("CSRF token is missing.");
        return;
      }

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

      try {
        const response = await axios.post(
          'http://localhost:8000/api/generate_slide_structure/',
          { contentPrompt: script },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
              'Authorization': `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const { generated_script_outline } = response.data; // Assuming the response contains the slides
          console.log("Slides received in video slides: ", generated_script_outline);
          setSlideOutline(generated_script_outline); // Store the slides in state
        } else {
          setError('Failed to generate slide outline.');
        }
      } catch (err) {
        setError('Failed to generate slide outline: ' + err.message);
        console.error('Error generating slide outline:', err);
      }
    } catch (err) {
      setError('Error processing the request: ' + err.message);
      console.error('Error processing the request:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (index, newTitle) => {
    const updatedOutline = JSON.parse(slideOutline);
    updatedOutline.slides[index].title = newTitle;
    setSlideOutline(JSON.stringify(updatedOutline));
  };

  const handleContentChange = (index, newContent) => {
    const updatedOutline = JSON.parse(slideOutline);
    updatedOutline.slides[index].content = newContent.split('\n');
    setSlideOutline(JSON.stringify(updatedOutline));
  };

  const parsedOutline = slideOutline ? JSON.parse(slideOutline) : null;

  return (
    <div className="video-slides-container">
      <h2>Video ID</h2>
      {videoId ? (
        <p>Your Video ID is: {videoId}</p>
      ) : (
        <p>No video ID available.</p>
      )}

      <button onClick={getVideoLink} disabled={loading}>
        {loading ? 'Loading...' : 'Get Video Link'}
      </button>

      {videoUrl ? (
        <div>
          <h3>Video is ready!</h3>
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

      <button onClick={generateSlideOutline} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Slide Outline'}
      </button>

      {parsedOutline ? (
        <div>
          <h3>Generated Script Outline</h3>
          {parsedOutline.slides.map((slide, index) => (
            <div key={index}>
              <input
                type="text"
                value={slide.title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
              />
              <textarea
                value={slide.content.join('\n')}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No slide outline generated yet.</p>
      )}
    </div>
  );
};

export default VideoSlides;