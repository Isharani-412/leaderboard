// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static" className="bg-gradient bg-dark">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="text-light">
          Points System
        </Typography>
        <Button color="inherit" component={Link} to="/" className="text-light">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/history" className="text-light">
          History
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;