import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from "../../constants"; // Make sure this is defined
import { isTokenExpired, refreshToken } from "../../util/auth";
import setAuthToken from "../../util/setAuthToken";

const Profile = () => {
  const navigate = useNavigate();

  // State to store user profile data and loading/error state
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the user data from the backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let accessToken = localStorage.getItem(ACCESS_TOKEN);

        // If the token is expired, refresh it
        if (!accessToken || isTokenExpired(accessToken)) {
          accessToken = await refreshToken();
        }

        if (!accessToken) {
          setError("User not authenticated. Please log in.");
          navigate("/login");
          return;
        }

        setAuthToken(`Bearer ${accessToken}`);

        // Send GET request to the backend to fetch user profile data
        const response = await axios.get('http://localhost:8000/api/get_user_profile/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Pass the access token in the header
          },
        });

        // Set the response data to state
        setUserData(response.data);
      } catch (err) {
        setError("Error fetching user profile: " + err.message);
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p><strong>Username:</strong> {userData.username}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
