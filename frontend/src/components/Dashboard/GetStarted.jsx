import React, { useState } from 'react';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'; // Import LoadingIndicator component

const GetStarted = () => {
    const [apiToken, setApiToken] = useState(''); // Define the apiToken state

    return (
        <div>

            <h2>Getting Started..</h2>
            <h3>Please enter your HeyGen API Token to jubmpstart your ProfAI experience!</h3>

            {/* Optional Token Input */}
            <div className="input-container">
                <label>API Token:</label>
                <input
                    type="text"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    placeholder="Enter API Token"
                    className="input-box"
                />
            </div>
        </div>
    );
};

export default GetStarted;
