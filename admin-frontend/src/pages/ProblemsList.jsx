import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import { fetchProblems, deleteProblem } from '../api/problemApi';
import ConfirmModal from '../components/ConfirmModal';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

function ProblemsList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProblems();
  }, []);

  const loadProblems = () => {
    setLoading(true);
    fetchProblems()
      .then(setProblems)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProblem(deleteTarget._id);
      setProblems(prev => prev.filter(p => p._id !== deleteTarget._id));
      setToast({ message: 'Problem deleted successfully', type: 'success' });
    } catch {
      setToast({ message: 'Failed to delete problem', type: 'error' });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const filtered = problems
    .map((p, i) => ({ ...p, sno: i + 1 }))
    .filter(p => {
      const q = search.trim().toLowerCase();
      const matchSearch = !q || p.title.toLowerCase().includes(q) || String(p.sno) === q;
      const matchFilter = filter === 'all' || p.difficulty === filter;
      return matchSearch && matchFilter;
    });

  if (loading) return <Loader />;

  return (
    <div className="page-enter">
      <div className="page-header page-header-row">
        <div>
          <h2>All Problems</h2>
          <p>{problems.length} problem{problems.length !== 1 ? 's' : ''} in your library</p>
        </div>
        <div className="page-header-actions">
          <Link to="/problems/new" className="btn btn-primary">
            <HiOutlinePlus /> Add Problem
          </Link>
        </div>
      </div>

      <div className="page-body">
        <div className="lc-list-wrap">
          <div className="table-toolbar">
            <div className="search-box">
              <span className="icon"><HiOutlineSearch /></span>
              <input
                type="text"
                placeholder="Search by title or S.No..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="search-problems"
              />
            </div>
            <div className="filter-group">
              {['all', 'easy', 'medium', 'hard'].map(f => (
                <button
                  key={f}
                  className={`filter-btn${filter === f ? ' active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* LeetCode-style header row */}
          <div className="lc-header">
            <span className="lc-col-num">S.No</span>
            <span className="lc-col-title">Title</span>
            <span className="lc-col-diff">Difficulty</span>
            <span className="lc-col-tests">Tests</span>
            <span className="lc-col-actions">Actions</span>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="icon">🔍</div>
              <h3>No problems found</h3>
              <p>{search ? 'Try a different search term.' : 'Start by adding your first problem.'}</p>
            </div>
          ) : (
            <div className="lc-rows">
              {filtered.map((problem, index) => (
                <div
                  key={problem._id}
                  className={`lc-row${index % 2 === 0 ? '' : ' lc-row-alt'}`}
                >
                  <span className="lc-col-num">{problem.sno}</span>
                  <span
                    className="lc-col-title lc-title-link"
                    onClick={() => navigate(`/problems/${problem._id}`)}
                  >
                    {problem.title}
                  </span>
                  <span className={`lc-col-diff lc-diff-${problem.difficulty}`}>
                    {problem.difficulty === 'easy' ? 'Easy' :
                     problem.difficulty === 'medium' ? 'Med.' : 'Hard'}
                  </span>
                  <span className="lc-col-tests">
                    {problem.testCases?.length || 0}
                  </span>
                  <span className="lc-col-actions">
                    <button
                      className="lc-action-btn"
                      title="Edit"
                      onClick={() => navigate(`/problems/${problem._id}/edit`)}
                    >
                      <HiOutlinePencil />
                    </button>
                    <button
                      className="lc-action-btn lc-action-danger"
                      title="Delete"
                      onClick={() => setDeleteTarget(problem)}
                    >
                      <HiOutlineTrash />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {deleteTarget && (
        <ConfirmModal
          title="Delete Problem"
          message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default ProblemsList;
