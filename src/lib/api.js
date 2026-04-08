function resolveApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  if (import.meta.env.DEV) {
    return 'http://localhost:5000/api';
  }

  return 'https://mail-revenue-pro.onrender.com/api';
}

const API_BASE_URL = resolveApiBaseUrl();
const ADMIN_SESSION_KEY = 'mrp_admin_session_v2';

export function getStoredAdminSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(ADMIN_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredAdminSession(session) {
  if (typeof window === 'undefined') {
    return;
  }

  if (session) {
    window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

function createHeaders(extraHeaders = {}) {
  const session = getStoredAdminSession();

  return {
    'Content-Type': 'application/json',
    ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
    ...extraHeaders,
  };
}

export async function apiRequest(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: createHeaders(options.headers),
    });
  } catch {
    throw new Error('Cannot reach the admin API. Check the production API URL and CORS settings.');
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed.');
    error.status = response.status;
    throw error;
  }

  return data;
}
