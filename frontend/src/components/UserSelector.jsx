// src/components/UserSelector.jsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const UserSelector = ({ users = [], selectedUser = null, onSelectUser }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="user-select-label">Select User</InputLabel>
      <Select
        labelId="user-select-label"
        id="user-select"
        value={selectedUser ? selectedUser._id : ''}
        label="Select User"
        onChange={(e) => {
          const selected = users.find(user => user._id === e.target.value);
          if (onSelectUser) {
            onSelectUser(selected);
          }
        }}
      >
        {users.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserSelector;
