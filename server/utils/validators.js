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

// score/testsPassed/totalTests are computed server-side from an actual test
// run, so the client only submits code plus time/hint claims
export function validateSolutionData({ code, timeSpent, hintsUsed }) {
  const errors = [];

  if (!code || typeof code !== 'string') {
    errors.push('code is required and must be a string');
  }
  if (code && code.length > 50000) {
    errors.push('code too large (max 50000 chars)');
  }
  // Number.isFinite also rejects NaN/Infinity, which pass typeof + range checks
  if (!Number.isFinite(timeSpent) || timeSpent < 0) {
    errors.push('timeSpent must be a non-negative number');
  }
  if (!Number.isFinite(hintsUsed) || hintsUsed < 0) {
    errors.push('hintsUsed must be a non-negative number');
  }

  return errors;
}

export function validateActivityData({ date }) {
  const errors = [];

  if (!date) {
    errors.push('date is required');
  }
  // Validate ISO date format YYYY-MM-DD and that it's a real calendar date
  if (date && (typeof date !== 'string' || !date.match(/^\d{4}-\d{2}-\d{2}$/) || Number.isNaN(Date.parse(date)))) {
    errors.push('date must be a valid date in YYYY-MM-DD format');
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
  if (problem.acceptance !== undefined && (!Number.isFinite(problem.acceptance) || problem.acceptance < 0 || problem.acceptance > 100)) {
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
