import { NavLink } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineCollection, HiOutlinePlusCircle, HiOutlineLogout, HiOutlineUserGroup } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  return (
    <>
      {isOpen && <div className="modal-overlay" style={{ zIndex: 99 }} onClick={onClose} />}
      <aside className={`sidebar${isOpen ? ' open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">CA</div>
          <div>
            <h1>CodeAdmin</h1>
            <span>Problem Manager</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            <span className="icon"><HiOutlineViewGrid /></span>
            Dashboard
          </NavLink>

          <NavLink
            to="/problems"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            <span className="icon"><HiOutlineCollection /></span>
            All Problems
          </NavLink>

          <NavLink
            to="/problems/new"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            <span className="icon"><HiOutlinePlusCircle /></span>
            Add Problem
          </NavLink>

          <NavLink
            to="/admins"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            <span className="icon"><HiOutlineUserGroup /></span>
            Manage Admins
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user?.name || 'Admin'}</span>
              <span className="sidebar-user-email">{user?.email || ''}</span>
            </div>
          </div>
          <button className="sidebar-logout-btn" onClick={logout} title="Sign out">
            <HiOutlineLogout />
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
