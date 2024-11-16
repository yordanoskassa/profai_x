import React, { useState, useEffect } from 'react';

const Voices = () => {
  const [voices, setVoices] = useState([]); // State to store the voices
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch voices from the API
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_voices/');
        if (!response.ok) {
          throw new Error('Failed to fetch voices');
        }

        const data = await response.json();
        console.log("Fetch successful:", data); // Debug log

        // Extract voices and set them in state
        if (data.data && Array.isArray(data.data.voices)) {
          setVoices(data.data.voices); // Store the voices array in state
        } else {
          setVoices([]); // No voices available
        }
      } catch (error) {
        setError(error.message); // Set error message
        console.error('Error fetching avatars:', error); // Log the error
      } finally {
        setLoading(false); // Stop loading indicator
        console.log("Fetch operation completed"); // Debug log
      }
    };

    fetchVoices();
  }, []);

  return (
    <div>
      <h2>Voices Component</h2>

      {/* Show loading indicator */}
      {loading && <p>Loading voices...</p>}

      {/* Show error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display voices or a "no voices available" message */}
      {!loading && !error && (
        <div>
          {voices.length > 0 ? (
            <ul>
              {voices.map((voice) => (
                <li key={voice.voice_id}>
                  <strong>{voice.name}</strong> {/* Display only the voice name */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No voices available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Voices;
