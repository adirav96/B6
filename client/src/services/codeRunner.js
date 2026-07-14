import { getToken } from './api.js';

// All execution happens on the server (local python with a Judge0 fallback) —
// test cases stay server-side and are never exposed to the browser.
export async function runCode(code, problemId, functionName) {
  try {
    const token = getToken();
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ code, problemId, functionName }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        success: false,
        results: [],
        stdout: '',
        stderr: data?.error || `Server error (${res.status})`,
      };
    }
    return data;
  } catch {
    return {
      success: false,
      results: [],
      stdout: '',
      stderr: 'Could not reach the server — please check your connection and try again.',
    };
  }
}
