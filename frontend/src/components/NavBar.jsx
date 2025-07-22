import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar 
      position="sticky"  // Changed from 'static' to 'sticky'
      className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 shadow-lg"
      sx={{
        background: 'linear-gradient(45deg, #7E57C2 0%, #EC407A 50%, #7E57C2 100%)',
        transition: 'all 0.3s ease',
        top: 0,
        zIndex: 1100, // Ensure navbar stays above other content
      }}
    >
      <Toolbar className="px-4">
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: '1px'
          }} 
          className="text-white font-serif tracking-wide"
        >
          ✨ Leaderboard  {/* Changed from "Points System" to "Leaderboard" */}
        </Typography>
        
        <div className="space-x-2">
          <Button 
            component={Link} 
            to="/" 
            className="text-white hover:bg-purple-700 transition-all duration-300 rounded-full px-4 py-2"
            sx={{
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            Dashboard
          </Button>
          <Button 
            component={Link} 
            to="/history" 
            className="text-white hover:bg-pink-600 transition-all duration-300 rounded-full px-4 py-2"
            sx={{
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            History
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
