import React, { useState } from 'react';
import { getScoreLabel, calculateScoreCounts } from '../utils/stableford';

const ScorecardRow = ({ holes, label, type }) => {
    // Helper to calculate totals for this row (Out/In)
    const totalPar = holes.reduce((acc, h) => acc + h.par, 0);
    const totalScore = holes.reduce((acc, h) => acc + h.score, 0);

    return (
        <div className="scorecard-row-wrapper">
            <div className="scorecard-label">{label}</div>
            <div className="scorecard-row-container">
                <div className="scorecard-grid">
                    {/* Header Row */}
                    <div className="grid-row header">
                        <div className="cell label-cell">Hole</div>
                        {holes.map(h => <div key={h.hole} className="cell">{h.hole}</div>)}
                        <div className="cell total-cell">Tot</div>
                    </div>
                    {/* Par Row */}
                    <div className="grid-row">
                        <div className="cell label-cell">Par</div>
                        {holes.map(h => <div key={h.hole} className="cell">{h.par}</div>)}
                        <div className="cell total-cell">{totalPar}</div>
                    </div>
                    {/* Score Row */}
                    <div className="grid-row">
                        <div className="cell label-cell">Score</div>
                        {holes.map(h => {
                            const diff = h.score - h.par;
                            let className = "cell score-cell";
                            if (diff < 0) className += " under-par"; // Birdie+
                            if (diff > 0) className += " over-par";  // Bogey
                            if (diff >= 2) className += " double-over"; // Double+

                            return (
                                <div key={h.hole} className={className}>
                                    <span className="score-value">{h.score}</span>
                                </div>
                            );
                        })}
                        <div className="cell total-cell">{totalScore}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResultsDisplay = ({ data, onReset }) => {
    let players = [];
    if (data.players) {
        players = data.players;
    } else if (data.holes) {
        players = [{ name: "Player 1", holes: data.holes }];
    }

    const [activeTab, setActiveTab] = useState(0);

    if (!players || players.length === 0) {
        return (
            <div className="results-container error">
                <h3>Could not parse scores.</h3>
                <button onClick={onReset} className="secondary-btn">Try Again</button>
            </div>
        );
    }

    const currentPlayer = players[activeTab];
    const { holes } = currentPlayer;
    const counts = calculateScoreCounts(holes);

    // Split holes into Front 9 and Back 9
    const front9 = holes.filter(h => h.hole <= 9);
    const back9 = holes.filter(h => h.hole > 9);

    const copyToClipboard = () => {
        let text = `Results for ${currentPlayer.name}\n`;
        text += holes.map(h => `${h.hole}:${h.score}`).join(' | ');
        navigator.clipboard.writeText(text).then(() => alert("Copied summary!"));
    };

    // Tally Order
    const tallyOrder = [
        { key: "HIO", color: "purple" },
        { key: "Albatross", color: "purple" },
        { key: "Eagle", color: "purple" },
        { key: "Birdie", color: "red" },
        { key: "Par", color: "gray" },
        { key: "Bogey", color: "blue" },
        { key: "Double Bogey", color: "black" },
        { key: "Triple Bogey", color: "black" },
        { key: "Quad Bogey+", color: "black" }
    ];

    return (
        <div className="results-container">

            {/* Player Tabs */}
            {players.length > 1 && (
                <div className="player-tabs-segment">
                    {players.map((p, idx) => (
                        <button
                            key={idx}
                            className={`segment-btn ${idx === activeTab ? 'active' : ''}`}
                            onClick={() => setActiveTab(idx)}
                        >
                            {p.name || `Player ${idx + 1}`}
                        </button>
                    ))}
                </div>
            )}

            {/* Tally Dashboard */}
            <div className="tally-dashboard">
                {tallyOrder.map((item) => {
                    const count = counts[item.key] || 0;
                    if (count === 0) return null; // Hide if zero

                    return (
                        <div key={item.key} className={`tally-card ${item.color}`}>
                            <span className="tally-count">{count}</span>
                            <span className="tally-label">{item.key}</span>
                        </div>
                    );
                })}
            </div>

            {/* Horizontal Scorecards */}
            <div className="scorecards-wrapper">
                {front9.length > 0 && <ScorecardRow holes={front9} label="Front 9" />}
                {back9.length > 0 && <ScorecardRow holes={back9} label="Back 9" />}
            </div>

            <div className="actions">
                <button onClick={copyToClipboard} className="primary-btn">Copy Summary</button>
                <button onClick={onReset} className="secondary-btn">New Upload</button>
            </div>
        </div>
    );
};

export default ResultsDisplay;
