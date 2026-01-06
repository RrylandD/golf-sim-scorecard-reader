import React, { useState } from 'react';
import { analyzeScorecardWithGemini } from '../utils/geminiService';

const ImageUpload = ({ onAnalysisComplete }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            // Reset logic if needed
        }
    };

    const handleProcess = async () => {
        if (!selectedImage) return;

        const apiKey = localStorage.getItem('gemini_api_key');
        if (!apiKey) {
            alert("Please set your Google Gemini API Key in Settings first.");
            return;
        }

        setIsProcessing(true);

        try {
            // Direct call to Gemini
            const data = await analyzeScorecardWithGemini(apiKey, selectedImage);

            onAnalysisComplete(data);
        } catch (error) {
            console.error(error);
            alert("Error processing image: " + error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-box">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="file-input"
                />
                <label htmlFor="file-input" className="file-label">
                    {selectedImage ? "Change Image" : "Upload Scorecard Photo"}
                </label>
            </div>

            {previewUrl && (
                <div className="preview-section">
                    <img src={previewUrl} alt="Scorecard Preview" className="preview-img" />

                    <div className="controls">
                        {!isProcessing ? (
                            <button onClick={handleProcess} className="process-btn">
                                Analyze Scorecard (Gemini AI)
                            </button>
                        ) : (
                            <p>Analyzing with AI...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
