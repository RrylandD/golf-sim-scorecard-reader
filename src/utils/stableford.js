/**
 * Calculates Gross Stableford points for a single hole.
 * @param {number} par 
 * @param {number} score 
 * @returns {number}
 */
export function calculateStablefordPoints(par, score) {
  if (!par || !score) return 0;
  const diff = score - par;
  const points = 2 - diff;
  return Math.max(0, points);
}

/**
 * Calculates total Stableford points.
 * @param {Array} holes 
 * @returns {number}
 */
export function calculateTotalPoints(holes) {
  return holes.reduce((sum, hole) => {
    return sum + calculateStablefordPoints(hole.par, hole.score);
  }, 0);
}

/**
 * Returns the label for a given score relative to par.
 * @param {number} par 
 * @param {number} score 
 * @returns {string}
 */
export function getScoreLabel(par, score) {
  if (!par || !score) return "-";

  // Check for Hole-in-One first
  if (score === 1) return "HIO";

  const diff = score - par;

  if (diff <= -3) return "Albatross";
  if (diff === -2) return "Eagle";
  if (diff === -1) return "Birdie";
  if (diff === 0) return "Par";
  if (diff === 1) return "Bogey";
  if (diff === 2) return "Double Bogey";
  if (diff === 3) return "Triple Bogey";
  if (diff >= 4) return "Quad Bogey+";

  return "Unknown";
}

export function calculateScoreCounts(holes) {
  const counts = {
    "HIO": 0,
    "Albatross": 0,
    "Eagle": 0,
    "Birdie": 0,
    "Par": 0,
    "Bogey": 0,
    "Double Bogey": 0,
    "Triple Bogey": 0,
    "Quad Bogey+": 0
  };

  holes.forEach(h => {
    const label = getScoreLabel(h.par, h.score);
    if (counts.hasOwnProperty(label)) {
      counts[label]++;
    }
  });

  return counts;
}
