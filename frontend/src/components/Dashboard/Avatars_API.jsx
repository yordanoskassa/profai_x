import React, { useEffect, useState } from 'react';

const AvatarList = () => {
  const [avatars, setAvatars] = useState([]);
  const [error, setError] = useState(null);
  print("avatars api file hit")
  useEffect(() => {
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
        console.log('Fetched data:', data);
        
        setAvatars(data.avatars.map(avatar => avatar.name) || []);  // Adjust based on HeyGen's response structure
      } catch (error) {
        setError(error.message);
        console.error('Error fetching avatars:', error);
      }
    };

    fetchAvatars();
  }, []);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {avatars.length > 0 ? (
        <ul>
          {avatars.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      ) : (
        <div>No avatars available.</div>
      )}
    </div>
  );
};

export default AvatarList;
