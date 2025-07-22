import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, Button, Alert } from '@mui/material';

const AddUserForm = ({ onUserAdded, loading }) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    try {
      setError(null);
      await onUserAdded(userName.trim());
      setUserName('');
    } catch (err) {
      setError('Failed to add user');
    }
  };

  return (
    <Paper elevation={3} className="p-3 mb-3 bg-dark text-light">
      <Typography variant="h6" gutterBottom className="text-light">
        Add New User
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="User Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          margin="normal"
          disabled={loading}
          className="bg-light"
        />
        <Box className="mt-2">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!userName.trim() || loading}
            className="bg-primary text-white"
          >
            {loading ? 'Adding...' : 'Add User'}
          </Button>
        </Box>
        {error && (
          <Alert severity="error" className="mt-2 bg-danger text-white">
            {error}
          </Alert>
        )}
      </Box>
    </Paper>
  );
};bo

export default AddUserForm;
