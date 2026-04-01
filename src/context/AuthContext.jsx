import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const USERS_STORAGE_KEY = 'mrp_users';
const CURRENT_USER_KEY = 'mrp_current_user';

const getStoredUsers = () => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const setStoredUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const getStoredCurrentUser = () => {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const setStoredCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredCurrentUser());

  useEffect(() => {
    if (user) {
      setStoredCurrentUser(user);
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const register = (email, password, role = 'client') => {
    const users = getStoredUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: 'Email already registered.' };
    }
    const newUser = { email: email.toLowerCase(), password, role };
    const updated = [...users, newUser];
    setStoredUsers(updated);
    setUser({ email: newUser.email, role: newUser.role });
    return { success: true };
  };

  const login = (email, password) => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { error: 'User not found, please sign up.' };
    }
    if (found.password !== password) {
      return { error: 'Invalid password.' };
    }
    const currentUser = { email: found.email, role: found.role };
    setUser(currentUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
