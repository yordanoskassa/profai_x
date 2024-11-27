import React from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";
import { isTokenExpired, refreshToken } from "../../util/auth";
import setAuthToken from "../../util/setAuthToken";

const AvatarList = ({ setJsonData, setError, setLoading, loading }) => {
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

  const fetchAvatars = async () => {
    console.log("Starting fetch operation...");
    setLoading(true);

    try {
      const csrfToken = await fetchCSRFToken();
      let accessToken = localStorage.getItem(ACCESS_TOKEN);

      if (!accessToken || isTokenExpired(accessToken)) {
        accessToken = await refreshToken();
      }

      if (!accessToken) {
        setError("User not authenticated. Please log in.");
        return;
      }

      // Set the authorization token for all requests
      setAuthToken(`Bearer ${accessToken}`);

      const response = await axios.get("http://localhost:8000/api/get_avatars/", 
        {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      console.log("Fetch successful:", data);
      setJsonData(JSON.stringify(data, null, 2));
    } catch (error) {
      setError(error.message);
      console.error("Error fetching avatars:", error);
    } finally {
      setLoading(false);
      console.log("Fetch operation completed");
    }
  };

  return (
    <div>
      <button onClick={fetchAvatars} disabled={loading}>
        {loading ? "Loading..." : "Fetch Avatars"}
      </button>
    </div>
  );
};

export default AvatarList;