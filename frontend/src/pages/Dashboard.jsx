import React, { useEffect, useState } from "react";
import UserSelector from "../components/UserSelector";
import Leaderboard from "../components/Leaderboard";
import AddUserForm from "../components/AddUserForm";
import { getRankings, claimPoints, addUser } from "../services/api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [recentPoints, setRecentPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRankings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRankings();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRankings();
  }, []);

  const handleClaimPoints = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      setError(null);
      const result = await claimPoints(selectedUser._id);
      setRecentPoints(result.pointsAwarded);
      setTimeout(() => setRecentPoints(null), 3000);
      await loadRankings();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (name) => {
    try {
      setLoading(true);
      setError(null);
      await addUser(name);
      await loadRankings();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 p-4" style={{ backgroundColor: "#1a0933" }}>
      <div className="container">
        <header className="text-center mb-5 py-4">
          <h1 className="display-4 fw-bold mb-3" style={{ color: "#e2b0ff" }}>
            Points Leaderboard
          </h1>
          <p className="lead" style={{ color: "#b388ff" }}>
            Track and reward your team's achievements
          </p>
        </header>

        {error && (
          <div
            className="alert alert-danger mb-4"
            style={{
              backgroundColor: "#4a148c",
              color: "#ff80ab",
              borderColor: "#7b1fa2",
            }}
          >
            Error: {error}
          </div>
        )}

        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <div
              className="p-4 rounded-3 h-100"
              style={{
                backgroundColor: "rgba(146, 110, 191, 0.3)",
                border: "1px solid rgba(188, 56, 245, 0.3)",
              }}
            >
              <AddUserForm onUserAdded={handleAddUser} loading={loading} />
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="p-4 rounded-3 h-100"
              style={{
                backgroundColor: "rgba(146, 110, 191, 0.3)",
                border: "1px solid rgba(188, 56, 245, 0.3)",
              }}
            >
              <UserSelector
                users={users}
                selectedUser={selectedUser}
                onSelectUser={setSelectedUser}
              />
              <div className="d-grid mt-3">
                <button
                  className={`btn btn-lg ${
                    !selectedUser || loading ? "btn-secondary" : ""
                  }`}
                  onClick={handleClaimPoints}
                  disabled={!selectedUser || loading}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.6rem 1.5rem",
                    background:
                      !selectedUser || loading
                        ? "#6c757d" // fallback for secondary/disabled
                        : "linear-gradient(to right, #ba68c8, #9c27b0)", // purple gradient
                    border:
                      !selectedUser || loading
                        ? "1px solid #adb5bd"
                        : "1px solid #ba68c8",
                    color: "white",
                    fontWeight: "500",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor:
                      !selectedUser || loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    "Claim Points"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {recentPoints && (
          <div
            className="alert mb-4 text-center"
            style={{
              backgroundColor: "#7b1fa2",
              color: "white",
              borderColor: "#9c27b0",
            }}
          >
            🎉 Awarded {recentPoints} points to {selectedUser.name}!
          </div>
        )}

        <div
          className="p-0 rounded-3 overflow-hidden"
          style={{
            backgroundColor: "rgba(74, 20, 140, 0.3)",
            border: "1px solid rgba(123, 31, 162, 0.3)",
          }}
        >
          <Leaderboard data={users} />
        </div>
      </div>
    </div>
  );
}
