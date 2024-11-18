import React from "react";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import "./AvatarList.css";

const AvatarList = ({ setJsonData, setError, setLoading, loading }) => {
  const fetchAvatars = async () => {
    console.log("Starting fetch operation...");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/get_avatars/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
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
    <div className="avatar-list-container">
      <button className="fetch-button" onClick={fetchAvatars}>
        Fetch Avatars
      </button>
    </div>
  );
};

export default AvatarList;
