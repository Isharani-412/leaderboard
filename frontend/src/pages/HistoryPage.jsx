import React, { useEffect, useState } from 'react';
import { getPointHistory } from '../services/api';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPointHistory();
      setHistory(data);
    } catch (err) {
      setError(err.message || 'Failed to load history');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
        <div className="mt-2">
          <button
            onClick={loadHistory}
            className="btn btn-primary px-3 py-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 text-light">
      <h2 className="mb-4">Points History</h2>

      {history.length === 0 ? (
        <div className="alert alert-info text-dark" role="alert">
          No history records found
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-dark table-striped">
            <thead className="table-primary text-white">
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record._id}>
                  <td>
                    {new Date(record.createdAt).toLocaleDateString()}
                    <div className="text-muted small">
                      {new Date(record.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td>{record.userName}</td>
                  <td>{record.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
