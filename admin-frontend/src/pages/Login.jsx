import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.message);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="login-page">
      <div className="login-bg-glow" />
      <div className="login-card">
        <div className="login-brand">
          <div className="sidebar-brand-icon" style={{ width: 52, height: 52, fontSize: 22 }}>CA</div>
          <h1>CodeAdmin</h1>
          <p>Sign in to manage your problem library</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <span className="login-field-icon"><HiOutlineMail /></span>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <span className="login-field-icon"><HiOutlineLockClosed /></span>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? (
              <span className="login-spinner" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
