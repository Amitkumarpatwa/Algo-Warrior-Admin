import { Link } from 'react-router-dom';
import { HiOutlineLockClosed } from 'react-icons/hi';

function AccessDenied() {
  return (
    <div className="login-page">
      <div className="login-bg-glow" />
      <div className="login-card" style={{ textAlign: 'center' }}>
        <div className="access-denied-icon">
          <HiOutlineLockClosed />
        </div>
        <h1 className="access-denied-title">No Access</h1>
        <p className="access-denied-text">
          You don't have permission to view this page. Please sign in with an admin account to continue.
        </p>
        <Link to="/login" className="btn btn-primary login-btn">
          Go to Sign In
        </Link>
      </div>
    </div>
  );
}

export default AccessDenied;
