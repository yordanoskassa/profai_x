import React from 'react';

const AvatarList = ({ setJsonData, setError }) => {
  const fetchAvatars = async () => {
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
      setJsonData(JSON.stringify(data, null, 2)); // Convert JSON to a formatted string for display
    } catch (error) {
      setError(error.message);
      console.error('Error fetching avatars:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchAvatars}>Fetch Avatars</button>
    </div>
  );
};

export default AvatarList;
