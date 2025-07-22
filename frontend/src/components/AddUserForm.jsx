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
    <Paper
  elevation={3}
  sx={{
    p: 3,
    mb: 3,
    background: 'linear-gradient(to right, #fce4ec, #f8bbd0)', // Light pink gradient
    borderRadius: 2,
  }}
>
  <Typography variant="h6" gutterBottom sx={{ color: '#4a0033', fontWeight: '600' }}>
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
      sx={{
        backgroundColor: '#fff',
        borderRadius: 1,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ba68c8', // purple border
          },
          '&:hover fieldset': {
            borderColor: '#ab47bc',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#4a0033', // dark purple on focus
            borderWidth: '2px',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#ba68c8',
          fontWeight: 500,
          '&.Mui-focused': {
            color: '#4a0033', // dark purple label on focus
          },
        },
      }}
    />

    <Box className="mt-2">
      <Button
        type="submit"
        variant="contained"
        disabled={!userName.trim() || loading}
        sx={{
          display: 'inline-flex',
          px: 3,
          py: 1,
          background: 'linear-gradient(to right, #ec407a, #ab47bc)',
          color: 'white',
          fontWeight: 600,
          borderRadius: '9999px',
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(to right, #d81b60, #8e24aa)',
          },
        }}
      >
        {loading ? 'Adding...' : 'Add User'}
      </Button>
    </Box>

    {error && (
      <Alert
        severity="error"
        sx={{
          mt: 2,
          backgroundColor: '#ffebee',
          color: '#b71c1c',
          borderLeft: '5px solid #e53935',
        }}
      >
        {error}
      </Alert>
    )}
  </Box>
</Paper>

  );
};

export default AddUserForm;
