import React, { useState } from 'react';
import './Dashboard.css'; // Ensure styles match your theme
import { useNavigate } from 'react-router';

function Dashboard() {
    const [videos, setVideos] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [avatarResult, setAvatarResult] = useState(null);

    const handleVideoUpload = (event) => {
        const newFiles = Array.from(event.target.files);
        if (videos.length + newFiles.length > 5) {
            alert('You can only upload a maximum of 5 videos.');
            return;
        }
        setVideos(prevVideos => [...prevVideos, ...newFiles]);
    };

    const handleRemoveVideo = (indexToRemove) => {
        setVideos(videos.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = () => {
        if (videos.length !== 5) {
            alert('Please upload exactly 5 videos.');
            return;
        }
        // Simulate processing
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setAvatarResult('Your avatar has been generated!'); // Placeholder result
        }, 3000); // Simulate a 3-second processing delay
    };

    return (
        <div className="studio-container">
            <div className="studio-header">
                <h2>Upload Your Videos</h2>
                <button className="studio-close" onClick={ () => navigate(-1) }> &times;
                </button>
            </div>

            <input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoUpload}
                disabled={videos.length >= 5 || processing}
            />
            <div className="video-preview">
                {videos.map((video, index) => (
                    <div key={index} className="video-item">
                        <video src={URL.createObjectURL(video)} controls />
                        <button className="remove-video-button" onClick={() => handleRemoveVideo(index)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} disabled={processing}>
                {processing ? 'Processing...' : 'Generate Avatar'}
            </button>
            {avatarResult && <div className="avatar-result">{avatarResult}</div>}
        </div>
    );
};

export default Dashboard;
