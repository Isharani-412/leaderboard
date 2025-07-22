import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const UserSelector = ({ users = [], selectedUser = null, onSelectUser }) => {
  return (
    <FormControl fullWidth sx={{ my: 4 }}>
      <InputLabel 
        id="user-select-label"
        sx={{
          color: '#ff69b4', // Initial label color (pink)
          fontWeight: 600,
          '&.Mui-focused': {
            color: '#4a0033', // Dark purple on focus
          }
        }}
      >
        Select User
      </InputLabel>
      <Select
        labelId="user-select-label"
        id="user-select"
        value={selectedUser ? selectedUser._id : ''}
        label="Select User"
        onChange={(e) => {
          const selected = users.find(user => user._id === e.target.value);
          if (onSelectUser) onSelectUser(selected);
        }}
        sx={{
          background: 'linear-gradient(to right, #ffdde1, #ee9ca7)', // pink gradient
          borderRadius: 2,
          border: '2px solid #ff69b4',
          color: '#4a0033',
          fontWeight: 500,
          '.MuiSelect-icon': {
            color: '#4a0033' // Dropdown icon color
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4a0033',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ff69b4',
            borderWidth: '2px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ff1493',
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              background: '#ffe4ec',
              mt: 1,
              borderRadius: 2,
              boxShadow: 3
            }
          }
        }}
      >
        {users.map((user) => (
          <MenuItem 
            key={user._id} 
            value={user._id}
            sx={{
              color: '#880044',
              '&.Mui-selected': {
                backgroundColor: '#fbb1bd !important',
                fontWeight: 'bold'
              },
              '&:hover': {
                backgroundColor: '#ffd1dc',
              }
            }}
          >
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserSelector;
