import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const SESSION_KEY = 'codeadmin_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);

  // Load session from storage on mount
  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        const session = JSON.parse(raw);
        if (session && session.token) {
          setUser(session.user);
          setToken(session.token);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Fetch admins whenever token is set
  useEffect(() => {
    if (token) {
      fetch('/api/v1/auth', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAdmins(data.data);
        }
      })
      .catch(console.error);
    } else {
      setAdmins([]);
    }
  }, [token]);

  const login = useCallback(async (email, password) => {
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (data.success) {
        const loggedUser = { email: data.data.admin.email, name: data.data.admin.name, role: data.data.admin.role };
        const localToken = data.data.token;
        setUser(loggedUser);
        setToken(localToken);
        localStorage.setItem(SESSION_KEY, JSON.stringify({ user: loggedUser, token: localToken }));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Invalid credentials' };
      }
    } catch (err) {
      return { success: false, message: 'Server connection error' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const addAdmin = useCallback(async (newAdmin) => {
    try {
      const res = await fetch('/api/v1/auth', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAdmin)
      });
      const data = await res.json();
      
      if (data.success) {
        setAdmins(prev => [...prev, data.data]);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Failed to add admin.' };
      }
    } catch (err) {
      return { success: false, message: 'Server connection error' };
    }
  }, [token]);

  const removeAdmin = useCallback(async (email) => {
    try {
      const res = await fetch(`/api/v1/auth/${email}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        setAdmins(prev => prev.filter(a => a.email !== email));
        if (user?.email === email) {
          logout();
        }
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Failed to remove admin.' };
      }
    } catch (err) {
      return { success: false, message: 'Server connection error' };
    }
  }, [token, user, logout]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, admins, addAdmin, removeAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
