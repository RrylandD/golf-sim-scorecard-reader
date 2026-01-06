import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResultsDisplay from './components/ResultsDisplay';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleAnalysisComplete = (data) => {
    console.log("Analysis Data:", data);
    setResults(data);
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-top">
          <h1>Trackman Scorecard Reader</h1>
          <button onClick={() => setShowSettings(true)} className="settings-btn">⚙️ Settings</button>
        </div>
        <p>Upload a photo to calculate Stableford scores</p>
      </header>

      {showSettings && (
        <Settings
          onSave={() => setShowSettings(false)}
          onCancel={() => setShowSettings(false)}
        />
      )}

      <main>
        {!results ? (
          <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
        ) : (
          <ResultsDisplay data={results} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default App;
