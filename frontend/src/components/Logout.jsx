import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Assuming you have an api setup for axios or other
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator/LoadingIndicator";

const LogoutButton = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);

        try {
            // Send POST request to the logout route
            await api.post('/logout/', {}); // Assuming the logout route is /logout/

            // Clear tokens from local storage
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);

            // Redirect to the login page after logout
            navigate("/login");
        } catch (error) {
            alert('Logout failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <LoadingIndicator />}
            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;
