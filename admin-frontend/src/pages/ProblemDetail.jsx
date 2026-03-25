import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineArrowLeft } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import { fetchProblem, deleteProblem } from '../api/problemApi';
import DifficultyBadge from '../components/DifficultyBadge';
import ConfirmModal from '../components/ConfirmModal';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchProblem(id)
      .then(setProblem)
      .catch(() => setToast({ message: 'Problem not found', type: 'error' }))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProblem(id);
      setToast({ message: 'Problem deleted', type: 'success' });
      setTimeout(() => navigate('/problems'), 1000);
    } catch {
      setToast({ message: 'Failed to delete', type: 'error' });
    } finally {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  if (loading) return <Loader />;
  if (!problem) {
    return (
      <div className="page-enter">
        <div className="page-body">
          <div className="empty-state">
            <div className="icon">❌</div>
            <h3>Problem not found</h3>
            <p>The problem you're looking for doesn't exist.</p>
            <Link to="/problems" className="btn btn-primary">Back to Problems</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div className="page-header detail-header-row page-header-row">
        <div className="detail-header-left">
          <button className="action-btn" onClick={() => navigate('/problems')} title="Back">
            <HiOutlineArrowLeft />
          </button>
          <div>
            <h2>{problem.title}</h2>
            <div className="detail-header-meta">
              <DifficultyBadge difficulty={problem.difficulty} />
              <span className="detail-header-tests">
                {problem.testCases?.length || 0} test case{(problem.testCases?.length || 0) !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
        <div className="detail-header-actions page-header-actions">
          <Link to={`/problems/${id}/edit`} className="btn btn-secondary btn-sm">
            <HiOutlinePencil /> Edit
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => setShowDelete(true)}>
            <HiOutlineTrash /> Delete
          </button>
        </div>
      </div>

      <div className="page-body">
        <div className="detail-grid">
          <div>
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="card-header">
                <h3>Description</h3>
              </div>
              <div className="card-body markdown-content">
                <ReactMarkdown>{problem.description || '_No description provided._'}</ReactMarkdown>
              </div>
            </div>

            {problem.editorial && (
              <div className="card">
                <div className="card-header">
                  <h3>Editorial</h3>
                </div>
                <div className="card-body markdown-content">
                  <ReactMarkdown>{problem.editorial}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="card-header">
                <h3>Details</h3>
              </div>
              <div className="card-body detail-meta">
                <div className="meta-item">
                  <span className="meta-label">Difficulty</span>
                  <DifficultyBadge difficulty={problem.difficulty} />
                </div>
                <div className="meta-item">
                  <span className="meta-label">Test Cases</span>
                  <span className="meta-value">{problem.testCases?.length || 0}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Has Editorial</span>
                  <span className="meta-value">{problem.editorial ? 'Yes' : 'No'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">ID</span>
                  <span className="meta-value detail-id">{problem._id}</span>
                </div>
              </div>
            </div>

            {problem.testCases && problem.testCases.length > 0 && (
              <div className="card">
                <div className="card-header">
                  <h3>Test Cases</h3>
                </div>
                <div className="card-body">
                  {problem.testCases.map((tc, i) => (
                    <div key={i} className={`tc-item${i < problem.testCases.length - 1 ? ' tc-item-border' : ''}`}>
                      <div className="test-case-label">Test Case #{i + 1}</div>
                      <div className="tc-display-grid">
                        <div>
                          <div className="tc-label">INPUT</div>
                          <pre className="tc-pre">{tc.input}</pre>
                        </div>
                        <div>
                          <div className="tc-label">OUTPUT</div>
                          <pre className="tc-pre tc-pre-output">{tc.output}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDelete && (
        <ConfirmModal
          title="Delete Problem"
          message={`Are you sure you want to delete "${problem.title}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
          loading={deleting}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default ProblemDetail;
