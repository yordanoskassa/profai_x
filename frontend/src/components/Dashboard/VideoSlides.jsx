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
  const [loadingButton, setLoadingButton] = useState(null); // Track which button is loading
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
    setLoadingButton('getVideoLink');
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
      setLoadingButton(null);
    }
  };

  const generateSlideOutline = async () => {
    setLoadingButton('generateSlideOutline');
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
      setLoadingButton(null);
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

  const handleApprove = async () => {
    setLoadingButton('handleApprove');
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

      // Prepare the data to be sent in the API call
      const dataToSend = { slides: JSON.parse(slideOutline) };
      console.log(dataToSend)
      // Make the API call
      try {
        const response = await axios.post(
          'http://localhost:8000/api/approve_slides/',
          { slides: dataToSend },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
              'Authorization': `Bearer ${accessToken}`,
            },
            responseType: 'blob',
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log("Slides approved successfully.");
          // Create a Blob from the response data
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
          // Create a link element
          const link = document.createElement('a');
          // Set the download attribute with a filename
          link.href = window.URL.createObjectURL(blob);
          link.download = 'presentation.pptx';
          // Append the link to the body
          document.body.appendChild(link);
          // Programmatically click the link to trigger the download
          link.click();
          // Remove the link from the document
          document.body.removeChild(link);
        } else {
          setError('Failed to approve slides.');
        }
      } catch (err) {
        if (err.response && err.response.data) {
          const reader = new FileReader();
          reader.onload = () => {
            const errorText = reader.result;
            console.error('Error approving slides:', errorText);
            setError(`Failed to approve slides: ${errorText}`);
          };
          reader.readAsText(err.response.data);
        } else {
          setError('Failed to approve slides: ' + err.message);
          console.error('Error approving slides:', err);
        }
      }
    } catch (err) {
      setError('Error processing the request: ' + err.message);
      console.error('Error processing the request:', err);
    } finally {
      setLoadingButton(null);
    }
  };

  const parsedOutline = slideOutline ? JSON.parse(slideOutline) : null;

  return (
    <div className="video-slides-container">
      <button onClick={getVideoLink} disabled={loadingButton === 'getVideoLink'}>
        {loadingButton === 'getVideoLink' ? 'Loading...' : 'Get Video Link'}
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
  
      <button onClick={generateSlideOutline} disabled={loadingButton === 'generateSlideOutline'}>
        {loadingButton === 'generateSlideOutline' ? 'Generating...' : 'Generate Slide Outline'}
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
  
      {slideOutline && (
        <button onClick={handleApprove} disabled={loadingButton === 'handleApprove'}>
          {loadingButton === 'handleApprove' ? 'Approving...' : 'Approve'}
        </button>
      )}
    </div>
  );
};

  export default VideoSlides;