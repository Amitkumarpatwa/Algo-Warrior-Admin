import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineDocumentText, HiOutlineBeaker, HiOutlineLightBulb } from 'react-icons/hi';
import { fetchProblem, createProblem, updateProblem } from '../api/problemApi';
import TestCaseEditor from '../components/TestCaseEditor';
import Toast from '../components/Toast';
import Loader from '../components/Loader';

function ProblemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    description: '',
    difficulty: 'easy',
    editorial: '',
    testCases: [],
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchProblem(id)
        .then(data => {
          setForm({
            title: data.title || '',
            description: data.description || '',
            difficulty: data.difficulty || 'easy',
            editorial: data.editorial || '',
            testCases: data.testCases || [],
          });
        })
        .catch(() => setToast({ message: 'Failed to load problem', type: 'error' }))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setToast({ message: 'Title is required', type: 'error' });
      return;
    }
    if (!form.description.trim()) {
      setToast({ message: 'Description is required', type: 'error' });
      return;
    }

    setSaving(true);
    try {
      if (isEdit) {
        await updateProblem(id, form);
        setToast({ message: 'Problem updated successfully', type: 'success' });
        setTimeout(() => navigate(`/problems/${id}`), 1200);
      } else {
        const created = await createProblem(form);
        setToast({ message: 'Problem created successfully', type: 'success' });
        setTimeout(() => navigate(`/problems/${created._id}`), 1200);
      }
    } catch (err) {
      setToast({ message: err.message || 'Something went wrong', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-enter">
      <div className="page-header page-header-row">
        <div className="detail-header-left">
          <button className="action-btn" onClick={() => navigate(-1)} title="Back" type="button">
            <HiOutlineArrowLeft />
          </button>
          <div>
            <h2>{isEdit ? 'Edit Problem' : 'Add New Problem'}</h2>
            <p>{isEdit ? 'Update the problem details below' : 'Create a new coding problem for your platform'}</p>
          </div>
        </div>
      </div>

      <div className="page-body">
        <form onSubmit={handleSubmit}>
          {/* Section 1: Basic Info */}
          <div className="card form-section">
            <div className="card-header">
              <h3><HiOutlineDocumentText className="section-icon" /> Basic Information</h3>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Problem Title</label>
                    <input
                      id="title"
                      className="form-input"
                      type="text"
                      placeholder="e.g. Two Sum"
                      value={form.title}
                      onChange={e => handleChange('title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="difficulty">Difficulty Level</label>
                    <div className="difficulty-selector">
                      {['easy', 'medium', 'hard'].map(d => (
                        <button
                          key={d}
                          type="button"
                          className={`difficulty-option ${d}${form.difficulty === d ? ' active' : ''}`}
                          onClick={() => handleChange('difficulty', d)}
                        >
                          <span className="difficulty-dot" />
                          {d.charAt(0).toUpperCase() + d.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Problem Description</label>
                  <textarea
                    id="description"
                    className="form-textarea tall"
                    placeholder="Describe the problem, constraints, and examples using Markdown..."
                    value={form.description}
                    onChange={e => handleChange('description', e.target.value)}
                  />
                  <span className="form-hint">Supports Markdown: **bold**, *italic*, `code`, ```code blocks```</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Test Cases */}
          <div className="card form-section">
            <div className="card-header">
              <h3><HiOutlineBeaker className="section-icon" /> Test Cases</h3>
            </div>
            <div className="card-body">
              <TestCaseEditor
                testCases={form.testCases}
                onChange={testCases => handleChange('testCases', testCases)}
              />
            </div>
          </div>

          {/* Section 3: Editorial */}
          <div className="card form-section">
            <div className="card-header">
              <h3><HiOutlineLightBulb className="section-icon" /> Editorial (Optional)</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <textarea
                  id="editorial"
                  className="form-textarea"
                  placeholder="Explain the approach, time complexity, and solution strategy..."
                  value={form.editorial}
                  onChange={e => handleChange('editorial', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="form-submit-bar">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : (isEdit ? 'Update Problem' : 'Create Problem')}
            </button>
          </div>
        </form>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default ProblemForm;
