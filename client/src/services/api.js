//talks to the server
const TOKEN_KEY = 'codeinterview-token';

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function hasToken() {
  return !!getToken();
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`/api${path}`, { ...options, headers });

  if (res.status === 401) {
    setToken(null);
    throw new Error('UNAUTHORIZED');
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'שגיאת שרת');
  return data;
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
