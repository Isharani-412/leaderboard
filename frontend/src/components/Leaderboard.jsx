import React from "react";

const Leaderboard = ({ data = [] }) => {
  if (!data) {
    return (
      <div className="d-flex justify-content-center p-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="alert alert-info mt-2 text-dark" role="alert">
        No leaderboard data available
      </div>
    );
  }

  return (
    <div className="table-responsive mt-4">
      <h5 className="text-light mb-3">Leaderboard</h5>
      <table className="table table-bordered table-dark table-striped table-hover">
        <thead className="table-primary text-white">
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">User</th>
            <th scope="col">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user._id || index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.totalPoints || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
