import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const SESSION_KEY = 'codeadmin_session';
const ADMINS_KEY = 'codeadmin_admins';
const SESSION_MAX_AGE = 8 * 60 * 60 * 1000; // 8 hours

// Default admin — always present
const DEFAULT_ADMIN = {
  email: 'admin@codeadmin.com',
  password: 'admin123',
  name: 'Admin',
  role: 'admin',
};

// Simple hash to avoid storing raw passwords in session
function hashToken(email, password) {
  let hash = 0;
  const str = `${email}:${password}:codeadmin_secret_salt_2026`;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return 'tk_' + Math.abs(hash).toString(36) + '_' + str.length.toString(36);
}

function getAdmins() {
  try {
    const saved = localStorage.getItem(ADMINS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const hasDefault = parsed.some(a => a.email === DEFAULT_ADMIN.email);
      if (!hasDefault) parsed.unshift(DEFAULT_ADMIN);
      return parsed;
    }
  } catch {}
  return [DEFAULT_ADMIN];
}

function saveAdmins(admins) {
  localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState(getAdmins);

  // Use sessionStorage (per-tab) — each new tab requires fresh login
  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        const session = JSON.parse(raw);
        const currentAdmins = getAdmins();
        const admin = currentAdmins.find(a => a.email === session.email);

        if (
          admin &&
          session.token === hashToken(admin.email, admin.password) &&
          session.loginAt &&
          (Date.now() - new Date(session.loginAt).getTime()) < SESSION_MAX_AGE
        ) {
          setUser({ email: admin.email, name: admin.name, role: admin.role, loginAt: session.loginAt });
        } else {
          sessionStorage.removeItem(SESSION_KEY);
        }
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    const admin = admins.find(a => a.email === email && a.password === password);
    if (admin) {
      const loginAt = new Date().toISOString();
      const token = hashToken(admin.email, admin.password);
      const userData = { email: admin.email, name: admin.name, role: admin.role, loginAt };
      setUser(userData);
      // sessionStorage = per-tab, won't leak to new tabs
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...userData, token }));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  }, [admins]);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  const addAdmin = useCallback((newAdmin) => {
    const exists = admins.some(a => a.email === newAdmin.email);
    if (exists) return { success: false, message: 'An admin with this email already exists' };
    const updated = [...admins, { ...newAdmin, role: 'admin' }];
    setAdmins(updated);
    saveAdmins(updated);
    return { success: true };
  }, [admins]);

  const removeAdmin = useCallback((email) => {
    if (email === DEFAULT_ADMIN.email) return { success: false, message: 'Cannot remove the default admin' };
    const updated = admins.filter(a => a.email !== email);
    setAdmins(updated);
    saveAdmins(updated);
    if (user?.email === email) {
      setUser(null);
      sessionStorage.removeItem(SESSION_KEY);
    }
    return { success: true };
  }, [admins, user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, admins, addAdmin, removeAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
