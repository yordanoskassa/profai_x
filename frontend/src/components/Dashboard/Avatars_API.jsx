import React, { useEffect } from 'react';

const AvatarList = ({ setAvatars, setError }) => {
  console.log("AvatarList component hit");

  useEffect(() => {
    if (!token) {
      console.error("Token is missing in AvatarList.");
      setError("Token is required to fetch avatars.");
      return;
    }
    const fetchAvatars = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch('http://localhost:8000/api/get_avatars/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        console.log('Trying to fetch avatars');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched avatars:', data.avatars); // Log the entire avatars array
        setAvatars(data.avatars); // Set the entire avatars array
      } catch (error) {
        setError(error.message);
        console.error('Error fetching avatars:', error);
      }
    };

    fetchAvatars();
  }, [setAvatars, setError]);

  //return null; // This component does not render anything directly
};

export default AvatarList;
