import React from 'react';
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";


// help from https://chatgpt.com/c/6723ba6b-8df4-800d-bbd6-e64501351407 regarding the fetch issue

const AvatarList = ({ setJsonData, setError, setLoading, loading }) => {
  const fetchAvatars = async () => {
    console.log("Starting fetch operation..."); // Debug log
    setLoading(true); // Start loading indicator
    try {
      const response = await fetch('http://localhost:8000/api/get_avatars/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Fetch successful:", data); // Log successful fetch
      setJsonData(JSON.stringify(data, null, 2)); // Convert JSON to a formatted string for display
    } catch (error) {
      setError(error.message);
      console.error('Error fetching avatars:', error);
    } finally {
      setLoading(false); // Stop loading indicator
      console.log("Fetch operation completed"); // Debug log for completion
    }
  };

  return (
    <div>
      <button style={{ margin: '2em' }} onClick={fetchAvatars}>Fetch Avatars</button>
    </div>
  );
};

export default AvatarList;
