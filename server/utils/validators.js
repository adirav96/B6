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
    errors.push('problem must be an object');
  }
  if (!Array.isArray(messages)) {
    errors.push('messages must be an array');
  } else {
    for (let i = 0; i < messages.length; i++) {
      if (!messages[i].role || !messages[i].content) {
        errors.push(`message at index ${i} must have role and content`);
      }
      if (typeof messages[i].content !== 'string' || messages[i].content.length > 10000) {
        errors.push(`message at index ${i} content must be a string up to 10000 chars`);
      }
    }
  }
  if (code && typeof code !== 'string') {
    errors.push('code must be a string');
  }
  if (code && code.length > 50000) {
    errors.push('code too large (max 50000 chars)');
  }

  return errors;
}

export function validateSolutionData({ score, timeSpent, code, testsPassed, totalTests, hintsUsed }) {
  const errors = [];

  if (typeof score !== 'number' || score < 0 || score > 100) {
    errors.push('score must be a number between 0 and 100');
  }
  if (typeof timeSpent !== 'number' || timeSpent < 0) {
    errors.push('timeSpent must be a non-negative number');
  }
  if (code && typeof code !== 'string') {
    errors.push('code must be a string');
  }
  if (code && code.length > 50000) {
    errors.push('code too large (max 50000 chars)');
  }
  if (typeof testsPassed !== 'number' || testsPassed < 0) {
    errors.push('testsPassed must be a non-negative number');
  }
  if (typeof totalTests !== 'number' || totalTests < 0) {
    errors.push('totalTests must be a non-negative number');
  }
  if (testsPassed > totalTests) {
    errors.push('testsPassed cannot exceed totalTests');
  }
  if (typeof hintsUsed !== 'number' || hintsUsed < 0) {
    errors.push('hintsUsed must be a non-negative number');
  }

  return errors;
}

export function validateActivityData({ date }) {
  const errors = [];

  if (!date) {
    errors.push('date is required');
  }
  // Validate ISO date format YYYY-MM-DD
  if (date && !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    errors.push('date must be in YYYY-MM-DD format');
  }

  return errors;
}

export function validateProblemData(problem, { isCreate = false } = {}) {
  const errors = [];

  if (!problem || typeof problem !== 'object') {
    return ['problem must be an object'];
  }

  if ((isCreate || problem.id !== undefined) && (!Number.isInteger(Number(problem.id)) || Number(problem.id) <= 0)) {
    errors.push('id must be a positive integer');
  }
  if (isCreate && (!problem.title || typeof problem.title !== 'string')) {
    errors.push('title is required');
  }
  if (isCreate && (!problem.titleHe || typeof problem.titleHe !== 'string')) {
    errors.push('titleHe is required');
  }
  if (problem.difficulty && !['easy', 'medium', 'hard'].includes(problem.difficulty)) {
    errors.push('difficulty must be one of: easy, medium, hard');
  }
  if (problem.acceptance !== undefined && (typeof problem.acceptance !== 'number' || problem.acceptance < 0 || problem.acceptance > 100)) {
    errors.push('acceptance must be a number between 0 and 100');
  }
  if (problem.companies !== undefined && !Array.isArray(problem.companies)) {
    errors.push('companies must be an array');
  }
  if (problem.examples !== undefined && !Array.isArray(problem.examples)) {
    errors.push('examples must be an array');
  }
  if (problem.constraints !== undefined && !Array.isArray(problem.constraints)) {
    errors.push('constraints must be an array');
  }
  if (problem.hints !== undefined && !Array.isArray(problem.hints)) {
    errors.push('hints must be an array');
  }
  if (problem.starterCode !== undefined && (typeof problem.starterCode !== 'object' || problem.starterCode === null)) {
    errors.push('starterCode must be an object');
  }
  if (problem.testCases !== undefined && !Array.isArray(problem.testCases)) {
    errors.push('testCases must be an array');
  }

  return errors;
}
