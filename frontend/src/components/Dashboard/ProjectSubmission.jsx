import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "./ProjectSubmission.css"; // Import the CSS file for styling
import { ACCESS_TOKEN } from "../../constants";
import { isTokenExpired, refreshToken } from "../../util/auth";
import setAuthToken from "../../util/setAuthToken";

const ProjectSubmission = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { script } = location.state || { script: '' };
    const [isApproved, setIsApproved] = useState(false);
    const [title, setTitle] = useState("");
    const [avatarNames, setAvatarNames] = useState([]);
    const [avatarIds, setAvatarIds] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [selectedAvatarId, setSelectedAvatarId] = useState("");
    const [voiceNames, setVoiceNames] = useState([]);
    const [voiceIds, setVoiceIds] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState("");
    const [selectedVoiceId, setSelectedVoiceId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (isApproved) {
        fetchAvatars();
        fetchVoices();
      }
    }, [isApproved]);
  
    const fetchAvatars = async () => {
      setLoading(true);
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
  
        const response = await axios.get("http://localhost:8000/api/get_avatars/", {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
            'Authorization': `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
  
        if (response.status !== 200) {
          throw new Error("Failed to fetch avatars");
        }
  
        const data = response.data;
        const names = data.data?.avatars?.map((avatar) => avatar.avatar_name) || [];
        const ids = data.data?.avatars?.map((avatar) => avatar.avatar_id) || [];
        setAvatarNames(names);
        setAvatarIds(ids);
        setError(null);
      } catch (err) {
        setError("Failed to load avatars");
      } finally {
        setLoading(false);
      }
    };
  
    const fetchVoices = async () => {
      setLoading(true);
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
  
        const response = await axios.get("http://localhost:8000/api/get_voices/", {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
            'Authorization': `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
  
        if (response.status !== 200) {
          throw new Error("Failed to fetch voices");
        }
  
        const data = response.data;
        console.log("Response data:", data); // Log the response data
        const names = data.data?.voices?.map((voice) => voice.name) || [];
        const ids = data.data?.voices?.map((voice) => voice.voice_id) || [];
        setVoiceNames(names);
        setVoiceIds(ids);
        setError(null);
      } catch (err) {
        setError("Failed to load voices");
      } finally {
        setLoading(false);
      }
    };
  
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
  
    const handleBack = () => {
      navigate(-1); // Go back to the previous page
    };
  
    const handleApprove = () => {
      setIsApproved(true);
    };
  
    const handleGenerateVideo = async () => {
      if (!title) {
        setError("Title is required to generate the video.");
        return;
      }
  
      setLoading(true);
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
  
        const response = await axios.post("http://127.0.0.1:8000/api/generate_video/", {
          script,
          title,
          selectedAvatar: selectedAvatarId,
          selectedVoice: selectedVoiceId
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
            'Authorization': `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
  
        if (response.status !== 200) {
          throw new Error("Failed to generate video");
        }
  
        const data = response.data;
        console.log("Video generation response:", data); // Log the response data
        const videoId = data.data.video_id;
        navigate('dashboard/video-slides', { state: { videoId } });
        setError(null);
      } catch (err) {
        setError("Failed to generate video");
      } finally {
        setLoading(false);
      }
    };
  
    const handleAvatarChange = (e) => {
      const selectedIndex = e.target.selectedIndex;
      setSelectedAvatar(e.target.value);
      setSelectedAvatarId(avatarIds[selectedIndex - 1]); // Adjust index for the placeholder option
    };
  
    const handleVoiceChange = (e) => {
      const selectedIndex = e.target.selectedIndex;
      setSelectedVoice(e.target.value);
      setSelectedVoiceId(voiceIds[selectedIndex - 1]); // Adjust index for the placeholder option
    };
  
    return (
      <div className="project-submission-container">
        {!isApproved ? (
          <>
            <h2>Step 2: Final Script Approval</h2>
            <p>Does this script look okay to use?</p>
            <textarea
              value={script}
              readOnly
              className="form-control"
              rows="10"
            />
            <div className="button-group">
              <button onClick={handleBack} className="back-button">Back</button>
              <button onClick={handleApprove} className="approve-button">Approve</button>
            </div>
          </>
        ) : (
          <div className="approved-message">
            <h2>Step 3: Selecting your Avatar and Voice</h2>
            <p>Your script has been approved! Please select an avatar and a voice to generate a video.</p>
            {loading ? (
              <p>Loading avatars and voices...</p>
            ) : (
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="form-control"
                />
                <label>Select Avatar:</label>
                <select value={selectedAvatar} onChange={handleAvatarChange} required className="form-control">
                  <option value="">Select an avatar</option>
                  {avatarNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                  ))}
                </select>
                <label>Select Voice:</label>
                <select value={selectedVoice} onChange={handleVoiceChange} required className="form-control">
                  <option value="">Select a voice</option>
                  {voiceNames.map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                  ))}
                </select>
                <button onClick={handleGenerateVideo} className="generate-video-button">Generate Video</button>
              </div>
            )}
            {error && <div className="error-message">{error}</div>}
          </div>
        )}
      </div>
    );
  };
  
  export default ProjectSubmission;