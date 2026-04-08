import { apiRequest, getStoredAdminSession, setStoredAdminSession } from './api';

export function getAdminSession() {
  return getStoredAdminSession();
}

export function isAdminConfigured() {
  return true;
}

export function isAdminAuthenticated() {
  return Boolean(getStoredAdminSession()?.token);
}

export async function signInAdmin(email, password) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const session = {
    token: data.token,
    email: data.admin.email,
    signedInAt: new Date().toISOString(),
  };

  setStoredAdminSession(session);
  return { success: true, session };
}

export function signOutAdmin() {
  setStoredAdminSession(null);
}

export async function validateAdminSession() {
  const session = getStoredAdminSession();
  if (!session?.token) {
    return null;
  }

  const data = await apiRequest('/auth/me');
  const nextSession = { ...session, email: data.admin.email };
  setStoredAdminSession(nextSession);
  return nextSession;
}
