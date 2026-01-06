import React, { useState, useEffect } from 'react';

const Settings = ({ onSave, onCancel }) => {
    const [key, setKey] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('gemini_api_key');
        if (saved) setKey(saved);
    }, []);

    const handleSave = () => {
        localStorage.setItem('gemini_api_key', key);
        onSave(key);
    };

    return (
        <div className="settings-modal">
            <div className="settings-content">
                <h2>Settings</h2>
                <p>Enter your Google Gemini API Key.</p>
                <p className="hint">Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a></p>

                <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="api-input"
                />

                <div className="actions">
                    <button onClick={handleSave} className="primary-btn">Save</button>
                    <button onClick={onCancel} className="secondary-btn">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
