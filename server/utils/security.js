/**
 * Security utility functions
 */

/**
 * Sanitize untrusted text before interpolating it into an LLM prompt.
 * Length capping is the real defense here — it bounds how much injected
 * instruction text can ride along. Control characters are stripped because
 * they serve no purpose in problem descriptions. Note this cannot fully
 * prevent prompt injection; problem content is admin-authored, which is the
 * primary trust boundary.
 */
export function sanitizePromptText(text) {
  if (!text) return '';

  const maxLength = 1000;
  return String(text)
    .slice(0, maxLength)
    // strip control chars except newline (\x0A) and tab (\x09)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

/**
 * Validate password strength
 */
export function isStrongPassword(password) {
  if (typeof password !== 'string') return false;
  if (password.length < 8) return false;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasUpper && hasLower && hasNumber;
}

/**
 * Get password strength error message
 */
export function getPasswordError() {
  return 'Password must be at least 8 characters and include uppercase, lowercase, and a number';
}
