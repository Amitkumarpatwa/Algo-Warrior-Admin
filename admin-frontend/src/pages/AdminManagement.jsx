import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineShieldCheck } from 'react-icons/hi';
import Toast from '../components/Toast';

function AdminManagement() {
  const { admins, addAdmin, removeAdmin, user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [toast, setToast] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setToast({ message: 'All fields are required', type: 'error' });
      return;
    }
    if (form.password.length < 6) {
      setToast({ message: 'Password must be at least 6 characters', type: 'error' });
      return;
    }
    const result = addAdmin(form);
    if (result.success) {
      setToast({ message: `Admin "${form.name}" added successfully`, type: 'success' });
      setForm({ name: '', email: '', password: '' });
      setShowForm(false);
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  const handleRemove = (email, name) => {
    const result = removeAdmin(email);
    if (result.success) {
      setToast({ message: `Admin "${name}" removed`, type: 'success' });
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  return (
    <div className="page-enter">
      <div className="page-header page-header-row">
        <div>
          <h2>Admin Management</h2>
          <p>Manage who has access to the admin panel</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <HiOutlinePlus /> Add Admin
          </button>
        </div>
      </div>

      <div className="page-body">
        {showForm && (
          <div className="form-card" style={{ marginBottom: 24 }}>
            <form onSubmit={handleAdd}>
              <div className="form-grid">
                <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div className="form-group">
                    <label htmlFor="admin-name">Full Name</label>
                    <input
                      id="admin-name"
                      className="form-input"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="admin-email">Email</label>
                    <input
                      id="admin-email"
                      className="form-input"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="admin-password">Password</label>
                    <input
                      id="admin-password"
                      className="form-input"
                      type="password"
                      placeholder="Min 6 characters"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-actions" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Admin</button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="admin-list">
          {admins.map((admin) => (
            <div key={admin.email} className="admin-card">
              <div className="admin-card-left">
                <div className="admin-avatar">
                  {admin.name.charAt(0).toUpperCase()}
                </div>
                <div className="admin-info">
                  <div className="admin-name">
                    {admin.name}
                    {admin.email === user?.email && <span className="admin-you-badge">You</span>}
                  </div>
                  <div className="admin-email">{admin.email}</div>
                </div>
              </div>
              <div className="admin-card-right">
                <span className="admin-role-badge">
                  <HiOutlineShieldCheck /> Admin
                </span>
                {admin.email !== 'admin@codeadmin.com' && (
                  <button
                    className="action-btn danger"
                    title="Remove admin"
                    onClick={() => handleRemove(admin.email, admin.name)}
                  >
                    <HiOutlineTrash />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default AdminManagement;
