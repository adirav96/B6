/**
 * Scoring service for calculating interview problem scores
 */

/**
 * Calculate score based on test results, time, and hints used
 * Formula: (testsPassed / totalTests) * 70 + timeBonus - hintPenalty
 */
export function calculateScore(testsPassed, totalTests, timeSpent, hintsUsed = 0) {
  if (totalTests === 0 || testsPassed === undefined) return 0;
  
  const testScore = (testsPassed / totalTests) * 70;
  
  // Time bonus: lose points for time spent (max 30 point bonus for < 2 minutes)
  const timeMinutes = timeSpent / 60;
  const timeBonus = Math.max(0, 30 - Math.floor(timeMinutes));
  
  // Hint penalty: 5 points per hint
  const hintPenalty = (hintsUsed || 0) * 5;
  
  // Final score: 0-100
  return Math.max(0, Math.min(100, Math.round(testScore + timeBonus - hintPenalty)));
}

/**
 * Get score level/badge based on score
 */
export function getScoreLevel(score) {
  if (score >= 90) return { level: 'excellent', label: 'מעולה', color: 'green' };
  if (score >= 75) return { level: 'good', label: 'טוב', color: 'blue' };
  if (score >= 60) return { level: 'fair', label: 'סביר', color: 'yellow' };
  if (score >= 40) return { level: 'poor', label: 'חלש', color: 'orange' };
  return { level: 'failing', label: 'כישלון', color: 'red' };
}
