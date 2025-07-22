import React from "react";

const PointHistory = ({ history = [] }) => {
  if (!history || history.length === 0) {
    return (
      <div className="alert alert-info text-dark mt-3" role="alert">
        No point history available.
      </div>
    );
  }

  return (
    <div className="table-responsive mt-4">
      <h5 className="text-light mb-3">Point History</h5>
      <table className="table table-bordered table-dark table-striped table-hover">
        <thead className="table-primary text-white">
          <tr>
            <th>User</th>
            <th>Points Awarded</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record) => (
            <tr key={record._id}>
              <td>{record.userName}</td>
              <td>{record.points}</td>
              <td>{new Date(record.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointHistory;
