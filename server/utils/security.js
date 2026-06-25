/**
 * Security utility functions
 */

/**
 * Escape potentially dangerous text for prompt injection
 */
export function escapePromptText(text) {
  if (!text) return '';
  
  // Limit field length to prevent prompt injection
  const maxLength = 1000;
  return String(text)
    .slice(0, maxLength)
    .replace(/\\/g, '\\\\')      // Escape backslashes
    .replace(/`/g, '\\`')        // Escape backticks
    .replace(/\$/g, '\\$');      // Escape dollar signs
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
  return 'הסיסמה חייבת להכיל לפחות 8 תווים, אותיות גדולות וקטנות ומספרים';
}
