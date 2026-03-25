import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCollection, HiOutlineCheckCircle, HiOutlineExclamation, HiOutlineFire } from 'react-icons/hi';
import { fetchProblems } from '../api/problemApi';
import DifficultyBadge from '../components/DifficultyBadge';
import Loader from '../components/Loader';

function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems()
      .then(setProblems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const total = problems.length;
  const easy = problems.filter(p => p.difficulty === 'easy').length;
  const medium = problems.filter(p => p.difficulty === 'medium').length;
  const hard = problems.filter(p => p.difficulty === 'hard').length;

  if (loading) return <Loader />;

  return (
    <div className="page-enter">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Overview of your coding problem library</p>
      </div>

      <div className="page-body">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-icon purple"><HiOutlineCollection /></div>
            <div className="stat-card-value">{total}</div>
            <div className="stat-card-label">Total Problems</div>
          </div>
          <div className="stat-card easy">
            <div className="stat-card-icon green"><HiOutlineCheckCircle /></div>
            <div className="stat-card-value">{easy}</div>
            <div className="stat-card-label">Easy Problems</div>
          </div>
          <div className="stat-card medium">
            <div className="stat-card-icon orange"><HiOutlineExclamation /></div>
            <div className="stat-card-value">{medium}</div>
            <div className="stat-card-label">Medium Problems</div>
          </div>
          <div className="stat-card hard">
            <div className="stat-card-icon red"><HiOutlineFire /></div>
            <div className="stat-card-value">{hard}</div>
            <div className="stat-card-label">Hard Problems</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Recent Problems</h3>
            <Link to="/problems" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="card-body">
            {problems.length === 0 ? (
              <div className="empty-state">
                <div className="icon">📝</div>
                <h3>No problems yet</h3>
                <p>Start by adding your first coding problem.</p>
                <Link to="/problems/new" className="btn btn-primary">Add Problem</Link>
              </div>
            ) : (
              <div className="recent-problems">
                {problems.slice(0, 5).map((problem, index) => (
                  <Link
                    key={problem._id}
                    to={`/problems/${problem._id}`}
                    className="recent-item"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="recent-item-info">
                      <span className="problem-number">{index + 1}</span>
                      <DifficultyBadge difficulty={problem.difficulty} />
                      <span className="recent-item-title">{problem.title}</span>
                    </div>
                    <span className="recent-item-tests">
                      {problem.testCases?.length || 0} test{(problem.testCases?.length || 0) !== 1 ? 's' : ''}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
