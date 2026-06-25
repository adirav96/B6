/**
 * Validation utilities for request data
 */

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateChatRequest({ problem, messages, code, hintsRevealed }) {
  const errors = [];

  if (!problem || typeof problem !== 'object') {
    errors.push('problem חייב להיות object');
  }
  if (!Array.isArray(messages)) {
    errors.push('messages חייב להיות array');
  } else {
    for (let i = 0; i < messages.length; i++) {
      if (!messages[i].role || !messages[i].content) {
        errors.push(`message בעמדה ${i} חייב להכיל role ו-content`);
      }
      if (typeof messages[i].content !== 'string' || messages[i].content.length > 10000) {
        errors.push(`message בעמדה ${i} content חייב להיות string עד 10000 תווים`);
      }
    }
  }
  if (code && typeof code !== 'string') {
    errors.push('code חייב להיות string');
  }
  if (code && code.length > 50000) {
    errors.push('code גדול מדי (max 50000 תווים)');
  }

  return errors;
}

export function validateSolutionData({ score, timeSpent, code, testsPassed, totalTests, hintsUsed }) {
  const errors = [];

  if (typeof score !== 'number' || score < 0 || score > 100) {
    errors.push('score חייב להיות number בין 0 ל-100');
  }
  if (typeof timeSpent !== 'number' || timeSpent < 0) {
    errors.push('timeSpent חייב להיות number חיובי');
  }
  if (code && typeof code !== 'string') {
    errors.push('code חייב להיות string');
  }
  if (code && code.length > 50000) {
    errors.push('code גדול מדי (max 50000 תווים)');
  }
  if (typeof testsPassed !== 'number' || testsPassed < 0) {
    errors.push('testsPassed חייב להיות number חיובי');
  }
  if (typeof totalTests !== 'number' || totalTests < 0) {
    errors.push('totalTests חייב להיות number חיובי');
  }
  if (testsPassed > totalTests) {
    errors.push('testsPassed לא יכול להיות גדול מ-totalTests');
  }
  if (typeof hintsUsed !== 'number' || hintsUsed < 0) {
    errors.push('hintsUsed חייב להיות number חיובי');
  }

  return errors;
}

export function validateActivityData({ date }) {
  const errors = [];

  if (!date) {
    errors.push('date הוא שדה חובה');
  }
  // Validate ISO date format YYYY-MM-DD
  if (date && !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    errors.push('date חייב להיות בפורמט YYYY-MM-DD');
  }

  return errors;
}
