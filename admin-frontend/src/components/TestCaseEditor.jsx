import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';

function TestCaseEditor({ testCases, onChange }) {
  const addTestCase = () => {
    onChange([...testCases, { input: '', output: '' }]);
  };

  const removeTestCase = (index) => {
    onChange(testCases.filter((_, i) => i !== index));
  };

  const updateTestCase = (index, field, value) => {
    const updated = testCases.map((tc, i) =>
      i === index ? { ...tc, [field]: value } : tc
    );
    onChange(updated);
  };

  return (
    <div className="test-cases-editor">
      <div className="test-cases-header">
        <h4>Test Cases ({testCases.length})</h4>
        <button type="button" className="btn btn-primary btn-sm" onClick={addTestCase}>
          <HiOutlinePlus /> Add Test Case
        </button>
      </div>

      {testCases.length === 0 && (
        <div className="empty-state" style={{ padding: '30px 20px' }}>
          <p>No test cases yet. Click "Add Test Case" to add one.</p>
        </div>
      )}

      {testCases.map((tc, index) => (
        <div className="test-case-row" key={index}>
          <div>
            <div className="test-case-label">Input #{index + 1}</div>
            <textarea
              className="form-textarea"
              value={tc.input}
              onChange={e => updateTestCase(index, 'input', e.target.value)}
              placeholder="Enter test input..."
            />
          </div>
          <div>
            <div className="test-case-label">Expected Output</div>
            <textarea
              className="form-textarea"
              value={tc.output}
              onChange={e => updateTestCase(index, 'output', e.target.value)}
              placeholder="Enter expected output..."
            />
          </div>
          <button
            type="button"
            className="remove-test-btn"
            onClick={() => removeTestCase(index)}
            title="Remove test case"
          >
            <HiOutlineX />
          </button>
        </div>
      ))}
    </div>
  );
}

export default TestCaseEditor;
