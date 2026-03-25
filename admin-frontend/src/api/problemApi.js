const API_BASE = '/api/v1/problems';

export async function fetchProblems() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch problems');
  const data = await res.json();
  return data.data;
}

export async function fetchProblem(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch problem');
  const data = await res.json();
  return data.data;
}

export async function createProblem(problemData) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(problemData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create problem');
  }
  const data = await res.json();
  return data.data;
}

export async function updateProblem(id, problemData) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(problemData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update problem');
  }
  const data = await res.json();
  return data.data;
}

export async function deleteProblem(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete problem');
  const data = await res.json();
  return data.data;
}
