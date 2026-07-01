const TOKEN_KEY = 'codeinterview-token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function hasToken() {
  return !!getToken();
}

// retries handle Firebase cold-start latency on first request after idle
async function request(path, options = {}, retries = 2) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // back off progressively: 0s, 1s, 2s
      if (attempt > 0) await new Promise((r) => setTimeout(r, 1000 * attempt));

      const res = await fetch(`/api${path}`, { ...options, headers });

      if (res.status === 401) {
        setToken(null);
        throw new Error('UNAUTHORIZED');
      }

      // non-JSON usually means the proxy returned an error page
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('NOT_JSON');
      }
      const data = await res.json();
      if (!res.ok) {
        const err = new Error(data.error || 'Server error');
        err.status = res.status;
        throw err;
      }
      return data;
    } catch (err) {
      if (err.message === 'UNAUTHORIZED') throw err;
      if (err.status && err.status < 500) throw err; // don't retry client errors (4xx)
      lastError = err;
    }
  }
  throw new Error('Server unavailable, please try again');
}

export async function apiRegister(name, email, password, university) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, university }),
  });
  setToken(data.token);
  return data;
}

export async function apiLogin(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data;
}

export async function apiGetMe() {
  return request('/auth/me');
}

export async function apiGetSolutions() {
  return request('/solutions');
}

export async function apiSaveSolution(problemId, solutionData) {
  return request(`/solutions/${problemId}`, {
    method: 'POST',
    body: JSON.stringify(solutionData),
  });
}

export async function apiGetActivity() {
  return request('/activity');
}

export async function apiSaveActivity(date) {
  return request('/activity', {
    method: 'POST',
    body: JSON.stringify({ date }),
  });
}
