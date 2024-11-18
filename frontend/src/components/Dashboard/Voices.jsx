import React, { useState, useEffect } from 'react';
import './Voices.css';

const Voices = () => {
  const [voices, setVoices] = useState([]); // State to store the voices
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_voices/');
        if (!response.ok) {
          throw new Error('Failed to fetch voices');
        }

        const data = await response.json();
        console.log('Fetch successful:', data);

        if (data.data && Array.isArray(data.data.voices)) {
          setVoices(data.data.voices);
        } else {
          setVoices([]);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching voices:', error);
      } finally {
        setLoading(false);
        console.log('Fetch operation completed');
      }
    };

    fetchVoices();
  }, []);

  return (
    <div className="voices-container">
      <h2 className="voices-heading">Available Voices</h2>

      {loading && <p className="voices-loading">Loading voices...</p>}

      {error && <p className="voices-error">{error}</p>}

      {!loading && !error && (
        <div>
          {voices.length > 0 ? (
            <ul className="voices-list">
              {voices.map((voice) => (
                <li key={voice.voice_id} className="voice-item">
                  <strong>{voice.name}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-voices">No voices available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Voices;
